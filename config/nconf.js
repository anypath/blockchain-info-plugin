var nconf = require('nconf');


nconf
    .file({ file: __dirname + '/config.json' })
    .env();

nconf.defaults({
    'RIPPLE_REST_API': 'http://localhost:5990/',
    'RIPPLE_CHARTS_API': 'http://api.ripplecharts.com/api/exchange_rates',
    'BTC_INBOUND' : '<bitcoin_wallet_address>',
    'EXCHANGE_ISSUER_ADDRESS' : '<exchange_issuer_wallet_address>',
    'BLOCKCHAIN_API_KEY': '<blockchain_api_key>',
    'USER_ID' : 1, // external account ID
    'POLLING_FREQUENCY': 60000,
    'DISCOUNT_PERCENTAGE' : 10,
    'BTC_RECEIVE_NOTIFY' : ['CHANGE@ME.com'],
    'XRP_SENT_NOTIFY' : ['CHANGE@ME.com'],
    'SANE_PRICE_BASE' : 74874,
    'XRP_LOW_BALANCE_WARNING' : 40,
    'XRP_LOW_BALANCE_EMAIL' : ['CHANGE@ME.com'],
    'NUMBER_OF_CONFIRMATIONS': 2,
    'MANDRILL_KEY':'<mandrill_key>',
    "total_btc_received": 0,
    "gateway_hot_wallet": {
        "address": "<hot_wallet_address>",
        "secret": "<hot_wallet_secret>",
        "id": "3"
    },
    "btc_wallet_last_checked": null
});

module.exports = nconf;
