'use strict';

var Dao = require('./Dao');
var md5 = require('md5');

class LoginService {

    generateToken(email, password) {
        var tokenGenerated = "";
        var tokenGeneratedStr = (email + password + new Date().getTime() / 2);
        tokenGenerated = md5(tokenGeneratedStr);
        new Dao().updateUserToken(email, tokenGenerated);
        return tokenGenerated;
    }

}

module.exports = LoginService;