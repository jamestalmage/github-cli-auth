# Github command line authentication

Gets you an auth token by prompting the user on the command line (like [hub](http://github.com/github/hub) does).

## Usage

```js
var getAuthToken = require('github-cli-auth');

getAuthToken('token-name', function (err, authToken) {
    console.log(authToken);
});
```

this will prompt the user like this:

```
github.com: username:  csabapalfi
github.com: password (never stored):
github.com: 2-factor auth token:  123456
```

then call the callback with the auth token or error.

## Limitations

* can't re-create token with same name (POST or GET existing could be done)
* always asks for two-factor auth token
* only supports repo authorization scope
