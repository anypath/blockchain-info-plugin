'use strict';

var config = require('../config/nconf'),
    mailer = require('../lib/mailer'),
    request = require('request');

var json = {
    "pairs" : [{
        "base":{"currency":"BTC","issuer": config.get('EXCHANGE_ISSUER_ADDRESS')},
        "trade":{"currency":"XRP"}
    }]
}

var Convert = function(){
    this.saneMax = null;
    this.saneMin = null;
};

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

Convert.prototype.sanePice = function(exchangeRate){
    this.saneMax = config.get('SANE_PRICE_BASE') + (config.get('SANE_PRICE_BASE') * .05);
    this.saneMin = config.get('SANE_PRICE_BASE') - (config.get('SANE_PRICE_BASE') * .05);
    if(exchangeRate < this.saneMax) {
        if(exchangeRate > this.saneMin) {
            return true;
        }
    }
};

Convert.prototype.toXrp = function(amount, callback){
    var self = this;
    this.getRate(function(err, resp, body){
        if(err){
            return;
        } else {
            var exchangeRate = body[0]['last'];
            var discountBy = config.get('DISCOUNT_PERCENTAGE') / 100;

            var converted = self.convert(amount, exchangeRate, 'XRP', discountBy);
            callback(converted);
            
//            if(self.sanePice(exchangeRate)){
//                converted = self.convert(amount, exchangeRate, 'XRP', discountBy);
//                callback(converted);
//            } else {
//                mailer.sendEmail({
//                    to: config.get('BTC_RECEIVE_NOTIFY'),
//                    subject: '[WARNING] Sane price',
//                    body: 'Exchange rate of ' + exchangeRate.toFixed(2) + ' is out of the "sane" price range. Max: ' + self.saneMax + ', Min: ' + self.saneMin
//                });
//            }
        }
    })
};

module.exports = new Convert();