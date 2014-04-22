"use strict";

var config = require('../config/nconf'),
    convert = require('./convert'),
    blockchainListner = require('./blockchain_listener'),
    mailer = require('./mailer');

function middleware(payment, callback){
    var transactionInfo = {
        exchangeRate: null,
        btc: null
    };

    blockchainListner.listen(function(btc){
        transactionInfo.btc = btc.amount;
    });

    convert.getRate(function(err, resp, body){
        if(err){
            return;
        } else {
            transactionInfo.exchangeRate = body[0]['last'];

            mailer.sendEmail({
                to: config.get('XRP_SENT_NOTIFY'),
                subject: '[INFO] ' + payment.to_amount + ' XRPs processed',
                body: 'A transaction in the amount of ' + payment.to_amount + ' XRPs has been processed. ' +
                  'Bitstamp exchange rate: ' + transactionInfo.exchangeRate +
                  ' Effective exchange rate: ' + payment.to_amount / transactionInfo.btc + '.'
            });

            callback(payment);
        }

    });

}

module.exports = middleware;

