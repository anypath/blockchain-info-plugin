'use strict';

var config = require('../config/nconf'),
    mandrill = require('mandrill-api/mandrill');

var mandrillClient = new mandrill.Mandrill('5wmw7D6GdGX4xpmk5EpCxQ');

var Email = function(){};

Email.prototype.sendEmail = function(msg){

    var addresses = [];

    msg.to.forEach(function(element){
        addresses.push({"email": element, "type": "to"});
    });

    var message = {
        "text": msg.body,
        "subject": msg.subject,
        "from_email": "abiy@ripple.com",
        "to": addresses
    };

    this.send(message);
    
}

Email.prototype.send = function(message){
    var async = false;
    var ip_pool = "Main Pool";

    mandrillClient.messages.send({
        "message": message, "async": async, "ip_pool": ip_pool
    }, function(result){
        console.log(result);
    }, function(e){
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });
}

module.exports = new Email();