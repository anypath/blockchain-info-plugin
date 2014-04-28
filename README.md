## Ripple Gateway Bridge | BTC / XRP

This application is an inbound bridge for automatically selling XRP for BTC at a discount.
It listens to the blockchain and converts BTC to XRP upon two confirmations of the payment.
The application relies on the [Ripple Gateway](https://github.com/ripple/gatewayd) and [Ripple REST API](https://github.com/ripple/ripple-rest.git).

Features:
- Polls the specified wallet every minute via Blockchain.info's REST API
- Monitors Ripple hot wallet for balance via the Ripple REST API
- Upon transaction, application will send out an email notification with amount and effective exchange rate
- This light weight Node.js app is fully configurable

## Dependencies

1. Node.js
    - Install ripple-gateway v3.4.4 and other dependencies

2. Postgres
    - The easiest way to get started with Postgres is by launching a [free database hosted by Heroku](https://postgres.heroku.com/databases)

            cd node_modules/ripple-gateway

    - Follow [these](https://github.com/ripple/gatewayd/blob/master/doc/setup.md) instructions to configure [ripple-gateway](https://github.com/ripple/gatewayd)

3. [Ripple REST API](https://github.com/ripple/ripple-rest.git)
     - The Ripple REST API provides a simplified HTTP/JSON interface to all the Ripple protocol network operations, such as payments and other transactions.


## Running the gateway bridge

            cd .. && forever server.js

Once the server.js is started, the deposit and outgoing processes will be running in the background.
