var config = require('./config/nconf'),
    blockchain = require('./lib/blockchain_listener'),
    depositProcessor = require('./lib/deposit_processor'),
    hotWallet = require('./lib/poll_hot_wallet_balance');

blockchain.listen(function(btc){

    depositProcessor.start(btc, function(transaction){
//        gateway.deposits.record(transaction, function(transaction){
//            console.log(transaction);
//        });

    });

});

hotWallet.listen();
