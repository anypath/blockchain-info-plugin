var config = require('./config/nconf'),
    gateway = require('ripple-gateway'),
    blockchainListener = require('./lib/blockchain_listener.js'),
    mailer = require('./lib/mailer.js'),
    pollHotWalletBalance = require('./lib/poll_hot_wallet_balance.js');

blockchainListener.listen();

//pollHotWalletBalance();
