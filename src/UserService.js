'use strict';

var Dao = require('./Dao');
var md5 = require('md5');

class UserService {

    invalid(user){
        if (user.name == null || user.name == undefined ||
            user.email == null || user.email ==undefined ||
            user.password == null | user.password == undefined) {
            console.log(user.name);
            console.log(user.email);
            console.log(user.password);
            return true;
        }
        return false;
    }

    register(user, callback) {
        new Dao().saveUser(user, function (err, statusCode) {
            if (err) {
                console.log(err);
                return callback(400);
            }
            callback(statusCode);
        });
    }

    login(user, callback) {
        new Dao().findUser(user, function (err, result) {
            if (err) {
                return callback(400);
            }
            if (result) {
                new UserService().generateToken(user.email, user.password, function (err, token) {
                    if (err) {
                        console.log(err);
                        return callback(400);
                    }
                    if (token) {
                        return callback(200, token);
                    }
                });
            } else {
                return callback(401);
            }
        });
    }

    generateToken(email, password, callback) {
        var tokenGeneratedStr = (email + password + new Date().getTime() / 2);
        var tokenGeneratedMd5 = md5(tokenGeneratedStr);
        new Dao().updateUserToken(email, tokenGeneratedMd5, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            if (result) {
                callback(err, tokenGeneratedMd5);
            }
        });
    }

}

module.exports = UserService;