var Convert = function(){};

Convert.prototype.discount = function(amount, discount){
    var btc_units = 100000000;
    var m = amount * btc_units;
    var d = (m + (m * discount));
    return d / btc_units;
};

Convert.prototype.convert = function(amount, exchangeRate, toCurrency, discount) {
    var a = this.discount(amount, discount);
    return {
        amount: a * exchangeRate,
        currency: toCurrency
    }
};

module.exports = new Convert();