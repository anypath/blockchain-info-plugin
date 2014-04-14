"use strict";

var config = require('../config/nconf'),
    convert = require('./convert');

var DepositProcessor = function(){};

DepositProcessor.prototype.start = function(btc, callback){

    var transaction = {};
    convert.toXrp(btc.amount, function(toDeposit){
        transaction = {
            amount: toDeposit.amount,
            currency: toDeposit.currency,
            external_account_id: config.get('USER_ID')
        };

        callback(transaction);
    });
};

module.exports = new DepositProcessor();
