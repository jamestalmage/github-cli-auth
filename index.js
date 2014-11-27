'use strict';

var request = require('request');
var prompt = require('prompt');
var async = require('async');

module.exports = function getAuthToken (tokenName, callback) {
    async.waterfall(
        [
            promptUser,
            generateToken(tokenName),
            getResult
        ],
        callback);
};

module.exports.prompt = prompt;

function promptUser (callback) {
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
}

function generateToken (tokenName) {
    return function  (auth, callback) {
        request.post({
            url: 'https://api.github.com/authorizations',
            body: {
                scopes: [ 'repo' ],
                note: tokenName
            },
            json: true,
            auth: {
                user: auth.username,
                pass: auth.password
            },
            headers: {
                'User-Agent': 'github-cli-auth',
                'X-GitHub-OTP': auth.oneTimePassword
            }
        }, callback);
    };
}

function getResult (res, body, callback) {
    if(res.statusCode != 201) return callback(body);
    callback(null, body.token);
}
