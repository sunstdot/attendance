"use strict";


//  ***************************** 连接网络 *****************************
var neb = new Neb();
var chainId = 1001;
var netWork = "https://testnet.nebulas.io"
// var chainId = 100;
// var netWork = "http://localhost:8685"
neb.setRequest(new HttpRequest(netWork));

// ******************************* 账户相关 *****************************
// 创建新账户
var createAccount = function(accountFilePath, passphrase) {
    var promise = new Promise(function(resolve, reject){
        var account = Account.NewAccount();
        var key = account.toKeyString(passphrase);
        var address = account.getAddressString();
        fs.writeFileSync(accountFilePath, key, 'utf-8')
        console.log('创建账户成功，地址为：' + address);
        resolve(account);
    });
    return promise;
}
// 导入账户
var importAccount = function(accountcontent, passphrase) {
    var promise = new Promise(function(resolve, reject){
        var account =  new Account();
        // var key = fs.readFileSync(accountFilePath, 'utf-8');
        account.fromKey(accountcontent, passphrase);
        var address = account.getAddressString();
        console.log("导入账户成功，地址为：" + address);
        resolve(account);
    });
    return promise;
}
// 查询账户状态
var accountState = function(address) {
    neb.api.getAccountState(address).then(function(result) {
        console.log('账户余额：' + result.balance, '| nonce值：' + result.nonce, '| 账户类型：' + result.type);
        }).catch(function(err) {
            console.log(err);
    })
}

// ******************************* 交易相关 *****************************
// 查询交易结果
var receiptTransaction = function(txhash) {
    neb.api.getTransactionReceipt(txhash).then(function (resp) {
        console.log(resp);
    }).catch(function(err) {
        console.log(err);
    })
}

// 生成转账交易
var generateTransaction = function(value, fromAccount,toAccountAddress) {
    var promise = new Promise(function(resolve, reject){
        neb.api.getAccountState(fromAccount.getAddressString()).then(function(state) {
            var nonce = parseInt(state.nonce) + 1;
            var tx = new Transaction({
                chainID: chainId,
                from: fromAccount,
                to: toAccountAddress,
                value: value,
                nonce: nonce,
                gasPrice: 1000000,
                gasLimit: 2000000,
            });
            tx.signTransaction();
            console.log('正在生成转账交易 from:' + fromAccount.getAddressString() + ' to:' + toAccountAddress + ' value:' + value)
            resolve(tx.toProtoString());
        }).catch(function(err) {
            console.log(err);
        });
    });
    return promise;
}

// 生成合约交易
var generateContractTransaction = function(account, contractAddress, functionName, functionArgs) {
    var promise = new Promise(function(resolve, reject){
        neb.api.getAccountState(account.getAddressString()).then(function(state) {
            var nonce = parseInt(state.nonce) + 1;
            var tx = new Transaction({
                chainID: chainId,
                from: account,
                to: contractAddress,
                value: 0,
                nonce: nonce,
                gasPrice: 1000000,
                gasLimit: 100000,
                contract:{
                    function: functionName,
                    args: JSON.stringify(functionArgs)
                }
            });
            tx.signTransaction();
            console.log(JSON.stringify(functionArgs));
            console.log('正在生成合约调用 from:' + account.getAddressString() + ' 调用方法:' + functionName)
            resolve(tx.toProtoString());
        }).catch(function(err) {
            console.log(err);
        });
    });
    return promise;
}

// 提交交易数据
var submitTransaction = function(data, cb) {
    var promise = new Promise(function(resolve, reject){
        neb.api.sendRawTransaction(data).then(function (resp) {
            resp = resp.result || resp;
            var txhash = resp.txhash;
            console.log('交易提交成功，txhash:' + txhash);
            cb('success');
        }).catch(function (err) {
            cb(err);
            console.log(err);
        })
    });
    return promise;
}

// 调用查询合约
var callTransaction = function(accountAddress, contractAddress, functionName, functionArgs, cb) {
    // neb.api.getAccountState(accountAddress).then(function(state) {
    //     var nonce = parseInt(state.nonce) + 1;
    //     console.log(nonce);
        neb.api.call({
            chainID: chainId,
            from: accountAddress,
            to: contractAddress,
            value: 0,
            nonce: 0,
            gasPrice: 1000000,
            gasLimit: 2000000,
            contract: {
                function: functionName,
                args: JSON.stringify(functionArgs),
            }
        }).then(function (resp) {
            console.log(resp);
            cb(resp);
        }).catch(function(err) {
            console.log(err);
        })
    // })
}

// *******************************执行相关*****************************
// var account;
var passphrase = "123456"; // 账户密码
// var newAccountFilePath = path.join(__dirname, './accountT.json'); // 账户keystore地址
var contractAddress = 'n1rTUeonxeRCGGRHPN6mvWsd4pVsWfSNMaX';

// // 创建新账户并转账
// exports.newAndTransfer = function(value) {
//     importAccount(accountFilePath, passphrase).then(function(fromAccount) {
//         createAccount(newAccountFilePath, passphrase).then(function(toAccount) {
//             return generateTransaction(value, fromAccount, toAccount.getAddressString());
//         }).then(function(data) {
//             return submitTransaction(data);
//         });
//     });
// }
// // 对已有账户转账
// exports.transfer = function(value, address) {
//     importAccount(accountFilePath, passphrase).then(function(fromAccount) {
//         return generateTransaction(value, fromAccount, address);
//     }).then(function(data) {
//         return submitTransaction(data);
//     });
// }
// 存储内容
exports.savePromise = function(content, passphrase, args,cb) {
    // generateContractTransaction(content, contractAddress, "save", args).then(function(value) {
    //     return submitTransaction(value);
    // })
    importAccount(content, passphrase).then(function(account) {
        return generateContractTransaction(account, contractAddress, "save", args);
    }).then(function(value) {
        return submitTransaction(value,cb);
    })
}
// // 查询内容
exports.searchPromise = function(address, cb) {
    callTransaction(address, contractAddress, "search", [address],cb)
}

// newAndTransfer();
// accountState('n1KhawxttyQvkjhv6hngQv6YwyhM4iSDATW');
// transfer(100000000000, 'n1KhawxttyQvkjhv6hngQv6YwyhM4iSDATW')
// savePromise(newAccountFilePath, passphrase, ["aaron", "shitao", "hello world!"]);
// searchPromise('n1cuKUdxsoN1VxbaQeicALNZbsccJrsQdq3', )
// receiptTransaction('f8cff0d14b24b7db99dc6916d0be9928a93c099fc5614c536fe7fade9a64f9a7');

