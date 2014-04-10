'use strict';

var config = require('../config/nconf'),
    request = require('request');

var json = {
    "pairs" : [{
        "base":{"currency":"BTC","issuer": config.get('EXCHANGE_ISSUER_ADDRESS')},
        "trade":{"currency":"XRP"}
    }]
}

var Convert = function(){};

Convert.prototype.discount = function(amount, discount){
    var btc_units = 100000000;
    var m = amount * btc_units;
    var d = (m + (m * discount));
    return d / btc_units;
};

Convert.prototype.convert = function(amount, exchangeRate, toCurrency, discount) {
    var a = this.discount(amount, discount);
    return {
        amount: a * exchangeRate,
        currency: toCurrency
    }
};

Convert.prototype.getRate = function(callback) {
    var url = config.get('RIPPLE_CHARTS_API');
    request.post({ url: url, json: json }, callback);
    
};

Convert.prototype.toXrp = function(amount, callback){
    var self = this;
    this.getRate(function(err, resp, body){

        if(err){
            return;
        } else {
            var discountBy = config.get('DISCOUNT_PERCENTAGE') / 100,
                converted = self.convert(amount, body[0]['last'], 'XRP', discountBy);

            callback(converted);
        }
    })
}

module.exports = new Convert();