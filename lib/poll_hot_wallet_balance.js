"use strict";

var config = require('../config/nconf'),
    Mailer = require('../lib/mailer.js'),
    request = require('request');

var HotWallet = function(){};

HotWallet.prototype.ping = function(callback){
    request.get(config.get('RIPPLE_REST_API'), function(error, response, body){
        callback(error, response, body);
    });
};

HotWallet.prototype.pollBalance = function(callback){
    var self = this;
    var url = config.get('RIPPLE_REST_API') + '/v1/accounts/' + config.get('gateway_hot_wallet').address +'/balances';

    function init(){
        request.get(url, callback);
        setTimeout(function(){
            init();
        }, 10800000);
    }
    init();
}

HotWallet.prototype.notifyIfLow = function(balanceObj){

    balanceObj = JSON.parse(balanceObj)
    var bal = Number(balanceObj.balances[0].amount);

    if(bal <= config.get('XRP_LOW_BALANCE_WARNING')){

        Mailer.sendEmail({
            to: config.get('XRP_LOW_BALANCE_EMAIL'),
            subject: '[ALERT] Low hot wallet XRP balance',
            body: 'Hot wallet account balance is low (' + bal + ' XRPs). Please fund wallet.'
        });
    };
}

HotWallet.prototype.listen = function(){
    var self = this;

    this.pollBalance(function(error, response, body){
        self.notifyIfLow(body);
    });
}

module.exports = new HotWallet();