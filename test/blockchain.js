var assert = require('assert');
var blockchain = require('../lib/incoming_transaction_processor.js');
var config = require('../config/nconf');
var supertest = require('supertest');

describe('Ping Blockchain.info API', function(){
    describe('\nping', function(){
        it('should ping blockchain api', function(done){
            blockchain.ping(function(err, resp, body){
                assert(resp.statusCode === 200);
                done();
            });
        });
    });
});

describe('Get newly received payment from Blockchain.info', function(){
   describe('\nendpint call', function(){
        it('should return a number', function(done){
            blockchain.getReceived(config.get('BTC_INBOUND'), function(err, body){
                assert(Number(body) != NaN);
                done();
            });
        });
   });
});