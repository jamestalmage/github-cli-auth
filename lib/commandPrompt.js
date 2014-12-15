'use strict';

var prompt = require('prompt');

module.exports.getCredentials = function getCredentials (callback) {
    prompt.message = 'github.com';
    prompt.start();
    prompt.get({
        properties: {
            username: {
                description: 'username'
            },
            password: {
                description: 'password (never stored)',
                hidden: true
            },
            oneTimePassword: {
                description: '2-factor auth token'
            }
        }
    }, callback);
};
