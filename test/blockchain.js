var assert = require('assert');
var blockchain = require('../lib/blockchain_client.js');
var config = require('../config/nconf');
var supertest = require('supertest');

describe('Test Blockchain.info', function(){
    var timeout = 20000;
    describe('\nping', function(){
        it('should ping blockchain api', function(done){
            this.timeout(timeout);
            blockchain.ping(function(err, resp, body){
                assert.strictEqual(resp.statusCode, 200);
                done();
            });
        });
    });

   describe('\nendpoint call: get newly received payment', function(){
       this.timeout(timeout);
        it('should return a number', function(done){
            blockchain.getReceived(config.get('BTC_INBOUND'), function(err, resp, body){
                assert(Number(body) != NaN);
                done();
            });
        });
   });
});