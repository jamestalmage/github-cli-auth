'use strict';

var request = require('request');
var prompt = require('prompt');

prompt.message = 'Github Authentication';

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
}, function(err, result){
    request.get({
        url: 'https://api.github.com/authorizations',
        auth: {
            user: result.username,
            pass: result.password
        },
        headers: {
            'User-Agent': 'github-cli-auth',
            'X-GitHub-OTP': result.oneTimePassword
        }
    }).pipe(process.stdout);
});
