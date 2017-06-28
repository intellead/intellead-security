'use strict';

var Dao = require('./Dao');
var md5 = require('md5');

class LoginService {

    login(user, callback) {
        new Dao().findUser(user, function (err, result) {
            if (err) {
                return 400;
            }
            if (result) {
                this.generateToken(user.email, user.password, function (err, token) {
                    if (err) {
                        console.log(err);
                        return 400;
                    }
                    if (token) {
                        return (200, token);
                    }
                });
            } else {
                return 401;
            }
        });
    }

    generateToken(email, password, callback) {
        var tokenGeneratedStr = (email + password + new Date().getTime() / 2);
        var tokenGeneratedMd5 = md5(tokenGeneratedStr);
        new Dao().updateUserToken(email, tokenGeneratedMd5, function (err, result) {
            if (err) {
                callback(err);
            }
            if (result) {
                callback(err, tokenGeneratedMd5);
            }
        });
    }

}

module.exports = LoginService;