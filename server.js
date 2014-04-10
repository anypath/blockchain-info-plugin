var config = require('./config/nconf'),
    blockchain = require('./lib/blockchain_listener.js'),
    gateway = require('ripple-gateway'),
    hotWallet = require('./lib/poll_hot_wallet_balance.js');

blockchain.listen(function(transaction){
    //pass to Steven's deposit process
    console.log('PASS THIS OBJECT TO DEPOSITS PROCESS', transaction);
});

hotWallet.listen();
