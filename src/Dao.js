'use strict';

/*
 *
 * Copyright 2017 Softplan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

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
                        db.close();
                        return callback(err);
                    }
                    if (result) {
                        db.close();
                        return callback(err, 409);
                    }
                    db.collection('users').insertOne(
                        user,
                        function(err, result) {
                            if (err) {
                                db.close();
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
