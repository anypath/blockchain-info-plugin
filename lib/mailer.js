'use strict';

var config = require('../config/nconf'),
    AmazonSES = require('amazon-ses'),
    ses = new AmazonSES(config.get('AMAZON_SES_CREDENTIALS').AWSAccessKeyId, config.get('AMAZON_SES_CREDENTIALS').AWSSecretKey);

var Notifications = function(){};

Notifications.prototype.sendEmail = function(message){
    ses.send({
        from: 'abiy@ripple.com'
        , to: message.to
        , subject: message.subject
        , body: {
            text: message.body
            , html: message.body
        }
    });
};

module.exports = new Notifications ();
