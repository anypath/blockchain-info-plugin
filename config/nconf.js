var nconf = require('nconf');


nconf
    .file({ file: __dirname + '/config.json' })
    .env();

nconf.defaults({
    'RIPPLE_REST_API': 'http://localhost:5990/',
    'RIPPLE_CHARTS_API': 'http://api.ripplecharts.com/api/exchangerates',
    'BTC_INBOUND' : '<bitcoin_wallet_address>',
    'EXCHANGE_ISSUER_ADDRESS' : 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
    'BLOCKCHAIN_API_KEY': '<blockchain_api_key>',
    'USER_ID' : 1,
    'POLLING_FREQUENCY': 60000,
    'DISCOUNT_PERCENTAGE' : 10,
    'BTC_RECEIVE_NOTIFY' : ['abiy@ripple.com'],
    'XRP_SENT_NOTIFY' : ['abiy@ripple.com'],
    'SANE_PRICE_BASE' : 74874,
    'XRP_LOW_BALANCE_WARNING' : 40,
    'XRP_LOW_BALANCE_EMAIL' : ['abiy@ripple.com'],
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
