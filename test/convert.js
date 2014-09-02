var assert = require('assert');
var config = require('../config/nconf');
var exchangeRate = require('../lib/convert.js');

describe('Call ripple charts API', function(){
    it('should return a response code of 200', function(done){
        this.timeout(10000);
        exchangeRate.getRate(function(err, resp, body){

            assert.strictEqual(resp.statusCode, 200);
            assert(body.length >= 1);
            assert(body[0].hasOwnProperty('base'));
            assert.equal(body[0]['base']['currency'], 'BTC');
            assert.equal(body[0]['counter']['currency'], 'XRP');
            done();
        });
    });
});