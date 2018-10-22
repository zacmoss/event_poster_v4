const axios = require('axios');
const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const functions = require('./functions.js');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
var mongoose = require('mongoose');
Promise = require('bluebird');
mongoose.Promise = Promise;
require('dotenv').load();


app.use(cors());

app.use(express.static(path.join(__dirname, 'front-end/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("app server listening on" + port);
});

app.route('/test').get(function (req, res) {
    res.sendFile(process.cwd() + '/front-end/public/test.html');
});

// API call
const CONNECTION_STRING = process.env.DB;
app.get('/eventFeed', (req, res) => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        let dbo = db.db("jive-database");
        let collection = dbo.collection('events');
        collection.find().toArray(function(err, result) {
            let array = result;
            console.log(array);
            res.send(array);
        })
    });
})
app.post('/createEvent', (req, res) => {
    //res.set('Content-Type', 'text/json');

    let title = req.body.title;
    let location = req.body.location;
    let description = req.body.description;

    let eventObject = {
        "title": title,
        "location": location,
        "description": description
    }

    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        let dbo = db.db("jive-database");
        let collection = dbo.collection('events');
        collection.insertOne(eventObject);
    });

    res.send({ title: title, location: location, description: description });

})

app.post('/createUser', (req, res) => {

    let user = req.body.user;
    let password = req.body.password;

    let userObject = {
        "user": user,
        "password": password
    }

    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        let dbo = db.db("jive-database");
        let collection = dbo.collection('users');
        collection.findOne({user: user}, function(err, result) {
            if (result) {
                res.send("User already exists");
            } else {
                collection.insertOne(userObject);
                res.send("User successfully created");
            }
        });
    });
})


module.exports = app;