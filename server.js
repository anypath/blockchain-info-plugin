var config = require('./config/nconf'),
    blockchain = require('./lib/blockchain_listener'),
    depositProcessor = require('./lib/deposit_processor'),
    gateway = require('ripple-gateway'),
    hotWallet = require('./lib/poll_hot_wallet_balance');

blockchain.listen(function(btc){
    //pass to Steven's deposit process

    depositProcessor.start(btc, function(transaction){
        console.log('PASS THIS OBJECT TO DEPOSITS PROCESS', transaction);
    });

});
hotWallet.listen();
