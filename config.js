const web3 = require('@solana/web3.js');
require("dotenv").config();

module.exports = Object.freeze({
    CONNECTION: new web3.Connection(
        process.env.ENDPOINT_URL,
        'confirmed',
        )

});



