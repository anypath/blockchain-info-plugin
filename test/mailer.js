var config = require('../config/nconf'),
    assert = require('assert'),
    mailer = require('../lib/mailer');

describe('Email notification', function(){
   describe('\nsend test email', function(){
        it('\ntest email should go out, should return sent', function(done) {
            this.timeout(20000);
            mailer.sendEmail({
                to: ['abiy@ripple.com'],
                subject: 'UNIT TEST EMAIL',
                body: 'UNIT TEST BODY'
            }, function(result){
                assert(result[0].status === 'sent');
            }, function(e) {
                console.log('MANDRILL ERROR', e);
            });
            done();

        });
   });
});