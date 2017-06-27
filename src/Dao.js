'use strict';
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.MONGODB_URI;

class Dao {

    saveUser(user, callback) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
                callback(err);
            } else {
                db.collection('users').insertOne(
                    user,
                    function(err, result) {
                        console.log("Inserted a document into the [users] collection with email: " + user.email);
                        db.close();
                        callback(err, result);
                    }
                );
            }
        });
    }

}
module.exports = Dao;