'use strict';

var config = require('../config/nconf');

var IncomingTransactionProcessor = function(){};

IncomingTransactionProcessor.prototype.checkForNewPayment = function(received, total_received, callback) {
    console.log('checked at ', new Date());

    //Log last checked time in case of system crash
    config.set('btc_wallet_last_checked', new Date());
    config.save();

    if (received > total_received) {
        callback(Math.abs(received - total_received));
    } else{
        return;
    }
};

IncomingTransactionProcessor.prototype.queuePayment = function(diff, callback){
    var transaction = {
        amount: diff,
        currency: 'BTC'
    };
    //Store queue to database
    callback(transaction);
};

module.exports = new IncomingTransactionProcessor();