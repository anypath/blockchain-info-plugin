var assert =  require('assert');
var walletPoller = require('../lib/poll_hot_wallet_balance');

describe('Test Ripple REST endpoint', function(){

    describe('\nping', function(){
        it('should respond with a 200 status code', function(done){
            walletPoller.ping(function(error, response, body){
                assert.strictEqual(response.statusCode, 200);
                done();
            });
        });
    });

    describe('\ncheck for Balance', function(){
        it('should return an XRP balance', function(done){
            this.timeout(30000);
            walletPoller.pollBalance(function(error, response, body){
                body = JSON.parse(body);
                assert(body.success == true);
                assert(body.balances.length > 0);
                assert(body.balances[0].currency == "XRP");
                assert(Number(body.balances[0].amount) != NaN);
                done();
            });
        });
    });
});