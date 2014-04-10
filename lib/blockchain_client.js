'use strict';
var config = require('../config/nconf'),
    request = require('request'),
    incomingTransactionProcessor = require('./incoming_transaction_processor.js');

function blockchainEndpoint(address, confirmations) {
    var url = ['https://blockchain.info/q/getreceivedbyaddress/', address, '?confirmations=', confirmations, '&format=json&api_code=', config.get('BLOCKCHAIN_API_KEY')].join('');
    return url;
}

function local(address, confirmations){
    var url = ['http://localhost:3333/json/', address, '_received.json?confirmations=', confirmations].join('');
    return url;
}

var IncomingTransaction = function(){};

IncomingTransaction.prototype.ping = function(callback){
    request.get('https://blockchain.info/?api_code=' + config.get('BLOCKCHAIN_API_KEY'), function(err, resp, body){
        callback(err, resp, body);
    });
};

IncomingTransaction.prototype.getReceived = function(address, callback){
    var receivedUrl = blockchainEndpoint(address, config.get('NUMBER_OF_CONFIRMATIONS'));

    request.get(receivedUrl,function(err, resp, body) {
        callback(err, body)
    });
};

IncomingTransaction.prototype.poll = function(address, callback){
    this.getReceived(address, function(err, body){
        if(err){
            console.log(err);
            return;
        } else {
            //Check if there is a new confirmed payment
            incomingTransactionProcessor.checkForNewPayment(body, config.get('total_btc_received'), function(diff){
                //Queue if there is a new payment
                incomingTransactionProcessor.queuePayment(diff, function(incomingBtc){
                    callback(incomingBtc);
                });
            });
        }
    });
};

module.exports = new IncomingTransaction();
