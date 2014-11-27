'use strict';

var expect = require('expect.js');
var nock = require('nock');

var getAuthToken = require('./index.js');

getAuthToken.prompt.override = {
    username: 'a',
    password: 'b',
    oneTimePassword: 'c'
};

describe('getAuthKey', function () {

    it('on 201 Created - returns token', function (done) {
        nock('https://api.github.com')
            .post('/authorizations')
            .reply(201, {token: 'hey'});

        getAuthToken('myToken', function (err, token) {
            expect(err).to.be(null);
            expect(token).to.be('hey');
            done();
        });
    });


    it('on 422 Validation Error - error (key already exists)', function (done) {
        nock('https://api.github.com')
            .post('/authorizations')
            .reply(422, {});

        getAuthToken('myToken', function (err) {
            expect(err).to.be.ok();
            done();
        });
    });


    it('on 401 Unauthorized - error (invalid credentials)', function (done) {
        nock('https://api.github.com')
            .post('/authorizations')
            .reply(401, {});

        getAuthToken('myToken', function (err) {
            expect(err).to.be.ok();
            done();
        });
    });

});
