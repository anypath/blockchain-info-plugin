var assert = require('assert');
var processor = require('../lib/incoming_transaction_processor.js');

describe('Test incoming payment flow', function(){
   describe('\ncheck there is a new payment', function(){
       it('should initiate callback function up on new payment', function(done){
           this.timeout(1000);
            processor.checkForNewPayment(1000, 2000, function(result){
                assert(result > 0);
                done();
            });

       });

       it('should NOT initiate callback function up on new payment', function(done){
           this.timeout(1000);
           processor.checkForNewPayment(2000, 2000, function(result){
               assert(result > 0);
               done();
           });

       });
   })
});