"use strict";

var config = require('../config/nconf'),
    mailer = require('./mailer');

function middleware(payment, callback){
    mailer.sendEmail({
        to: config.get('XRP_SENT_NOTIFY'),
        subject: '[INFO] ' + payment.to_amount + ' XRP sent',
        body: payment.to_amount + ' XRP sent to Bitcoin Japan'
    });

    callback(payment);
    console.log('PAYMENT', payment);
}

module.exports = middleware;

