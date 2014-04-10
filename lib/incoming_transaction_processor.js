'use strict';

var request = require('request'),
    config = require('../config/nconf');

var BlockchainEndpoints = {
    host: 'https://blockchain.info',
    getReceivedUrl: function(address, confirmations) {
        var url = [this.host, '/q/getreceivedbyaddress/', address, '?confirmations=', confirmations, '&format=json&api_code=', config.get('BLOCKCHAIN_API_KEY')].join('');
        return url;
    }
};

var LocalEndpoints = {
    getReceivedUrl: function(address, confirmations){
        var url = ['http://localhost:3333/json/', address, '_received.json?confirmations=', confirmations].join('');
        return url;
    }
};

var IncomingTransactionProcessor = function(){};

IncomingTransactionProcessor.prototype.ping = function(callback){
    request.get(BlockchainEndpoints.host, function(err, resp, body){
         callback(err, resp, body);
    });
}

IncomingTransactionProcessor.prototype.getReceived = function(address, callback){
    var receivedUrl = LocalEndpoints.getReceivedUrl(address, config.get('NUMBER_OF_CONFIRMATIONS'));

    request.get(receivedUrl,function(err, resp, body) {
        callback(err, body)
    });
};

IncomingTransactionProcessor.prototype.checkForNewPayment = function(received, total_received, callback){
    console.log('checked at ', new Date());

    //Log last checked time in case of system crash
    config.set('btc_wallet_last_checked', new Date());
    config.save();

    if(received > total_received){
        callback(Math.abs(received - total_received));
    }
};

IncomingTransactionProcessor.prototype.queuePayment = function(diff, callback){
    var transaction = {
        amount: diff,
        currency: 'BTC',
        external_account_id: config.get('USER_ID') //ask steven what it is
    };

    //Store queue to database
    callback(transaction);

};

module.exports = new IncomingTransactionProcessor();