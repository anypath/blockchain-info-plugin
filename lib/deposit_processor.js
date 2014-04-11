var convert = require('./convert');

function middleware(deposit, callback){

    convert.toXrp(deposit.amount, function(xrp){

        var outgoingPayment = {
            amount: xrp.amount,
            currency: 'XRP',
            to_address_id: deposit.to_address_id
        };

        console.log(outgoingPayment);

        callback(null, outgoingPayment);
    });
};

module.exports = middleware;

