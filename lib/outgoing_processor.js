"use strict";

var config = require('../config/nconf'),
    mailer = require('./mailer');

var OutgoingProcessor = function(){};


function middleware(payment, callback){
    mailer.sendEmail({
        to: nconf.get('XRP_SENT_NOTIFY'),
        subject: '[INFO] ' + payment.source_amount.value + ' XRP sent',
        body: payment.source_amount.value + ' XRP sent to Bitcoin Japan'
    });

    callback(payment);
    console.log('PAYMENT', payment);
}

module.exports = middleware;
