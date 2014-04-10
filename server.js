var config = require('./config/nconf'),
    gateway = require('ripple-gateway'),
    blockchain = require('./lib/blockchain_listener'),
    depositProcessor = require('./lib/deposit_processor'),
    outgoing = require('./lib/outgoing_processor');

    hotWallet = require('./lib/poll_hot_wallet_balance');

blockchain.listen(function(btc){

    depositProcessor.start(btc, function(transaction){
        gateway.deposits.record(transaction, console.log);
    });

});

hotWallet.listen();
