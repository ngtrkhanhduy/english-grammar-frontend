const { override, useBabelRc } = require('customize-cra');

// Set the environment variable outside the override function
process.env.PORT = 8082;

module.exports = override(useBabelRc());
