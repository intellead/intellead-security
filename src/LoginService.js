'use strict';

var Dao = require('./Dao');
var md5 = require('md5');

class LoginService {

    generateToken(email, password) {
        var tokenGeneratedStr = (email + password + new Date().getTime() / 2);
        var tokenGeneratedMd5 = md5(tokenGeneratedStr);
        new Dao().updateUserToken(email, tokenGeneratedMd5);
        return tokenGeneratedMd5;
    }

}

module.exports = LoginService;