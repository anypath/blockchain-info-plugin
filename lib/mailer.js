'use strict';

var config = require('../config/nconf'),
    mandrill = require('mandrill-api/mandrill');

var mandrillClient = new mandrill.Mandrill(config.get('MANDRILL_KEY'));

var Email = function(){};

Email.prototype.sendEmail = function(msg){

    var addresses = [];

    msg.to.forEach(function(element){
        addresses.push({"email": element, "type": "to"});
    });

    var message = {
        "text": msg.body,
        "subject": msg.subject,
        "from_email": "CHANGE@ME.com",
        "to": addresses
    };

    this.send(message);
    
}

Email.prototype.send = function(message, onSuccess, onError){
    var async = false;
    var ip_pool = "Main Pool";

    mandrillClient.messages.send({
        "message": message, "async": async, "ip_pool": ip_pool
    }, onSuccess, onError);

//    function onSuccess(result){
//        console.log('STATUS', result[0].status);
//    }
//
//    function onError(e){
//        console.log('MANDRILL EMAIL ERROR', e.message);
//    }
}

module.exports = new Email();