'use strict';

var request = require('request');

module.exports.createNewToken = function createNewToken (tokenName, credentials, callback) {
    request.post({
        url: 'https://api.github.com/authorizations',
        body: {
            scopes: [ 'repo' ],
            note: tokenName
        },
        json: true,
        auth: {
            user: credentials.username,
            pass: credentials.password
        },
        headers: {
            'User-Agent': 'github-cli-auth',
            'X-GitHub-OTP': credentials.oneTimePassword
        }
    }, function (err, res, body) {
        if(err) return callback(err);
        if(res.statusCode != 201) return callback(body);
        callback(null, body.token);
    });
};
