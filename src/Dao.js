'use strict';
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.MONGODB_URI;

class Dao {

    saveUser(user, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                return callback(err);
            } else {
                db.collection('users').findOne({"email":user.email}, function(err, result) {
                    if (err) {
                        return callback(err);
                    }
                    console.log('RESULT: ' + result);
                    if (result) {
                        db.close();
                        return callback(err, 409);
                    }
                    db.collection('users').insertOne(
                        user,
                        function(err, result) {
                            if (err) {
                                return callback(err);
                            }
                            console.log("Inserted a document into the [users] collection with email: " + user.email);
                            db.close();
                            callback(err, 200);
                        }
                    );
                });
            }
        });
    }

    findUser(user, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                callback(err);
            } else {
                db.collection('users').findOne({"email":user.email, "password":user.password, "active":true},
                    function(err, result) {
                        db.close();
                        callback(err, result);
                });
            }
        });
    }

    updateUserToken(email, tokenGenerated, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                callback(err);
            } else {
                db.collection('users').update(
                    {"email" : email},
                    {'$set':{'currentToken':tokenGenerated}},
                    function(err, result) {
                        db.close();
                        callback(err, result);
                });
            }
        });
    }

}
module.exports = Dao;