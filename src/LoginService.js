'use strict';

var Dao = require('./Dao');
var md5 = require('md5');

class LoginService {

    login(user, callback) {
        console.log('3');
        new Dao().findUser(user, function (err, result) {
            console.log('4');
            if (err) {
                console.log('5');
                return callback(400);
            }
            if (result) {
                console.log('6');
                this.generateToken(user.email, user.password, function (err, token) {
                    console.log('7');
                    if (err) {
                        console.log(err);
                        return callback(400);
                    }
                    if (token) {
                        console.log('8');
                        return callback(200, token);
                    }
                });
            } else {
                console.log('9');
                return callback(401);
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