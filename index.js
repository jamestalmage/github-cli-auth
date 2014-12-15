'use strict';

var prompt = require('./lib/commandPrompt');
var github = require('./lib/githubApi');
var noop = function() {};

module.exports = function getAuthToken (options, callback) {

    var config = {
        name: options.name,
        load: options.load,
        save: options.save
    };

    var authToken = config.load();
    if(!authToken) {
        createAuthToken(config.name, function(err, newToken) {
            if(err) return callback(err);
            config.save(newToken);
            callback && callback(null, newToken);
        });
    } else {
        callback && callback(null, authToken);
    }
};

function createAuthToken (name, callback) {
    prompt.getCredentials(function(err, credentials){
        github.createNewToken(name, credentials, callback);
    });
}
