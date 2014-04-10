'use strict';
var config = require('../config/nconf'),
    mailer = require('./mailer.js');

var incomingTransactionProcessor = require('./incoming_transaction_processor.js');

var IncomingTransaction = function(){};

IncomingTransaction.prototype.poll = function(address, callback){
    incomingTransactionProcessor.getReceived(address, function(err, body){
        if(err){
            console.log(err);
            return;
        } else {
            //Check if there is a new confirmed payment
            incomingTransactionProcessor.checkForNewPayment(body, config.get('total_btc_received'), function(diff){
                //Queue if there is a new payment
                incomingTransactionProcessor.queuePayment(diff, function(transaction){
                    callback(transaction);
                });
            });
        }
    });
};

module.exports = new IncomingTransaction();
