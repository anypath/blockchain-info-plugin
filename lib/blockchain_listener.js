"use strict";

var config = require('../config/nconf'),
    mailer = require('./mailer'),
    blockchainClient = require('./blockchain_client');

var BlockchainListener = function(){};

BlockchainListener.prototype.listen = function(callback){

    var btc_units = 100000000;

    function init (){
        blockchainClient.poll(config.get('BTC_INBOUND'), function(btc) {

            //Store last total_received in config file
            config.set('total_btc_received', (btc.amount + config.get('total_btc_received')));
            config.save();

            btc.amount = btc.amount / btc_units;

            //Notify via email
            mailer.sendEmail({
                to: config.get('BTC_RECEIVE_NOTIFY'),
                subject: '[INFO] Incoming Bitcoin payment',
                body: 'New Bitcoin payment of ' + btc.amount + ' with ' + config.get('NUMBER_OF_CONFIRMATIONS') +' confirmation(s) has arrived.'
            });

            callback(btc);
        });

        setTimeout(function(){
            init();
        }, 10000);
    }
    init();
};


module.exports = new BlockchainListener();