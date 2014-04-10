var config = require('../config/nconf'),
    mailer = require('./mailer'),
    blockchainClient = require('./blockchain_client'),
    convert = require('./convert');

var BlockchainListener = function(){};


BlockchainListener.prototype.listen = function(callback){

    var btc_units = 100000000;

    function init (){
        blockchainClient.poll(config.get('BTC_INBOUND'), function(btc) {

            //Store last total_received in config file
            config.set('total_btc_received', (btc.amount + config.get('total_btc_received')));
            config.save();

            //Divide by satoshi's
            btc.amount = btc.amount / btc_units;

            //Notify via email
            mailer.sendEmail({
                to: config.get('BTC_RECEIVE_NOTIFY'),
                subject: '[INFO] Incoming Bitcoin payment',
                body: 'New Bitcoin payment of ' + btc.amount + ' with ' + config.get('NUMBER_OF_CONFIRMATIONS') +' confirmation(s) has arrived.'
            });


            var transaction;

            convert.toXrp(btc.amount, function(toDeposit){
                transaction = {
                    amount: toDeposit.amount,
                    currency: toDeposit.currency,
                    external_account_id: config.get('USER_ID')
                }
                //GATEWAY CALLBACK GOES HERE and pass the transaction Object
                callback(transaction);
            });

        });

        setTimeout(function(){
            init();
        }, 10000);
    }
    init();
};


module.exports = new BlockchainListener();