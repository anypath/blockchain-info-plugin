var gateway = require('ripple-gateway'),
    blockchain = require('./lib/blockchain_listener'),
    hotWallet = require('./lib/poll_hot_wallet_balance');

blockchain.listen(function(btc){

    var deposit = new Object(btc);
    deposit.external_account_id = 1;

    gateway.deposits.record(deposit, console.log);

});

hotWallet.listen();

gateway.start({
    processes: ['deposits', 'outgoing']
});