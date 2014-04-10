'use strict';

var config = require('../config/nconf'),
    request = require('request');

var json = {
    "pairs" : [{
        "base":{"currency":"BTC","issuer": config.get('EXCHANGE_ISSUER_ADDRESS')},
        "trade":{"currency":"XRP"}
    }]
}

var Exchange = {
    getRate: function(fn) {
        var url = config.get('RIPPLE_CHARTS_API');
        request.post({ url: url, json: json }, function(err, resp, body) {
            fn(err, body);
        });
    }
}


module.exports = Exchange;
