'use strict';
var Neb = require('./neb.js/index').Neb;
var HttpRequest = require('./neb.js/index').HttpRequest
var neb = new Neb();

var chainId = 1;
var netWork = "https://mainnet.nebulas.io"
neb.setRequest(new HttpRequest(netWork));

var contractAddress = "n1g2qPCDesNPzSg4bNGouz7y8x539JCb4AN";

var args = ['2018-06-10']

function search(){
    neb.api.call({
        chainID: chainId,
        from: contractAddress,
        to: contractAddress,
        value: 0,
        nonce: 0,
        gasPrice: 1000000,
        gasLimit: 2000000,
        contract: {
            function: "getByDate",
            args: JSON.stringify(args),
        }
    }).then(function (resp) {
        console.log(resp);
    }).catch(function(err) {
        console.log(err);
    })
}

search();