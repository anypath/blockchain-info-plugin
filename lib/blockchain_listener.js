var config = require('../config/nconf'),
    mailer = require('./mailer'),
    blockchainClient = require('./blockchain_client');

var BlockchainListener = function(){};

BlockchainListener.prototype.listen = function(){

    var btc_units = 100000000;

    var self = this;

    blockchainClient.poll(config.get('BTC_INBOUND'), function(transaction) {
        config.set('total_btc_received', (transaction.amount + config.get('total_btc_received')));
        config.save();

        transaction.amount = transaction.amount / btc_units;

        //Notify via email
        mailer.sendEmail({
            to: config.get('BTC_RECEIVE_NOTIFY'),
            subject: '[INFO] Incoming Bitcoin payment',
            body: 'New Bitcoin payment of ' + transaction.amount + ' with ' + config.get('NUMBER_OF_CONFIRMATIONS') +' confirmation(s) has arrived.'
        });

        //Store to DB

    });

    setTimeout(function(){
        self.listen();
    }, 10000);
};

module.exports = new BlockchainListener();