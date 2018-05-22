/**
 * @file fetch封装
 */

import fetch from 'isomorphic-fetch';
import jsonp from 'fetch-jsonp';

const MODE = [
    'same-origin', // 同源
    'no-cors', // 跨域不使用cors
    'cors' // 跨域 默认
];

/*
    序列化
 */
export const serialize = (params) => {
    const esc = encodeURIComponent;
    return Object.keys(params).sort()
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
};

/*
    http 请求
    @param url 请求地址
    @param options      
        {
            method, 
            mode, 
            contentType, 
            params = {}, 
            dataType, 
            interceptor: {
                needValidation: true, // 是否需要对返回结果的code做验证
                removeProtocol: true // 是否需要去掉url中的协议名
            },
            credentials <Boolean> ''(不带cookie) | 'inlcude'(带cookie)
            timeout: <Number> 默认为5000
        }
        @options needValidation <Boolean> 是否需要对结果的状态码进行验证(因为有的接口可能没有code字段)
    @return <Promise> 
        如果设置needValidation: true
        则当结果状态码为A00000（成功） | A00004（没数据）时，被resolve，否则被reject；
 */
export async function $http(url, options = {}) {
    let request;    // 请求api对象
    let method = (options.method || 'GET').toUpperCase();
    let mode = options.mod || MODE[2];  // 'cors'
    let contentType = options.contentType || '';
    let dataType = options.dataType || '';
    // 为'inlcude'时带cookie
    let credentials = options.credentials === false ? '' : 'include';
    let params = options.params || {};
    let _params = serialize(params);
    let sendObj = {
        method,
        mode,
        timeout: options.timeout
    };

    if (contentType === 'json') {
        sendObj['headers'] = {
            'Content-type': 'application/json'
        };
    } else if (contentType === 'text') {
        sendObj['headers'] = {
            'Content-type': 'text/plain'
        };
    } else if (contentType === 'multipart') {
        sendObj['headers'] = {
            'Content-type': 'multipart/form-data'
        };
    } else {
        sendObj['headers'] = {
            'Content-type': 'application/x-www-form-urlencoded'
        };
    }
    if (credentials) {
        if (mode === 'no-cors') {
            sendObj['credentials'] = 'same-origin';
        } else {
            sendObj['credentials'] = credentials;
        }
    }
    // 是否为get请求
    if (method === 'GET') {
        url = _params ? url + '?' + _params : url;
    } else {
        sendObj.body = _params;
    }
    if (method === 'GET' && dataType && dataType === 'jsonp') {
        request = jsonp;
        if (options.callback) {
            sendObj.jsonpCallbackFunction = options.callback;
        }
    } else {
        request = fetch;
    }

    const stream = await request(url, sendObj);
    let result;

    if (stream.ok) {
        if (contentType === 'text') {
            result = await stream.text();
        } else {
            result = await stream.json();
        }

        return interceptor(result, options.interceptor, url);
    } else if (stream.type === 'opaque') {
        return;
    } else {
        throwError(url, '返回出错！');
    }
}

const successCode = ['A00000', 'A00004'];

function throwError(url, result) {
    console.error(`【接口出错】请检查接口返回的数据是否有code字段，且code值为${successCode.join(',')}。如果不需要验证code字段，请添加needValidation: false，如$http(url, {params, interceptor: {needValidation: false}}).请求失败的url: ${url}`);
    throw new Error(result);
}

function interceptor(result, interceptor = { needValidation: true, removeProtocol: true }, url) {
    if (interceptor.needValidation !== false) {
        if (successCode.indexOf(result.code) < 0) {
            throwError(url, result);
        }
    }

    return result;
}
