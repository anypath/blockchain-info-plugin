var convert = require('./convert'),
    config = require('../config/nconf'),
    mailer = require('./mailer');

function middleware(deposit, callback){

    convert.toXrp(deposit.amount, function(xrp){
        var outgoingPayment = {
            amount: xrp.amount,
            currency: 'XRP',
            to_address_id: deposit.to_address_id
        };

        //TODO: abstract when gateway is updated
        mailer.sendEmail({
            to: config.get('XRP_SENT_NOTIFY'),
            subject: '[INFO] ' + xrp.amount + ' XRP sent',
            body: xrp.amount + ' XRP sent.'
        });

        callback(null, outgoingPayment);
    });
}

module.exports = middleware;