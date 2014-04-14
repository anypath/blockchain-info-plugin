"use strict";

var config = require('../config/nconf'),
    mailer = require('./mailer'),
    gateway = require(__dirname + '/../../ripple-gateway');

var OutgoingProcessor = function(){};

OutgoingProcessor.prototype.start = function(payment, callback){

    if(payment){
        Mailer.sendEmail({
            to: nconf.get('XRP_SENT_NOTIFY'),
            subject: '[INFO] ' + payment.source_amount.value + ' XRP sent',
            body: payment.source_amount.value + ' XRP sent to Bitcoin Japan'
        });

        callback(payment);
    }

};

module.exports = new OutgoingProcessor();
