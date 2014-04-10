var config = require('../config/nconf'),
    Mailer = require('../lib/mailer.js'),
    request = require('request');

var checkHotWalletBalance = function(){
    var url = config.get('RIPPLE_REST_API') + '/v1/accounts/' + config.get('gateway_hot_wallet').address +'/balances';

    request.get(url, function(err, resp, body){
        if(!err){
            var accountInfo = JSON.parse(body)
            var bal = Number(accountInfo.balances[0].amount);

            if(bal <= config.get('XRP_LOW_BALANCE_WARNING')){
                Mailer.sendEmail({
                    to: config.get('XRP_LOW_BALANCE_EMAIL'),
                    subject: '[ALERT] Low hot wallet XRP balance',
                    body: 'Hot wallet account balance is low (' + bal + ' XRPs). Please fund wallet.'
                });
            };
        }
    });
    setTimeout(checkHotWalletBalance, 10800000);
};

module.exports = checkHotWalletBalance;