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
const session = require('express-session');

let signedIn = false;


app.use(cors());

app.use(express.static(path.join(__dirname, 'front-end/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//app.use(session({secret: "discopuppy"}));
app.use(session({
    secret: "discopuppy",
    name: "cookie_name",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

const port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("app server listening on" + port);
});

app.route('/test').get(function (req, res) {
    res.sendFile(process.cwd() + '/front-end/public/test.html');
});




// HTTP Requests

const CONNECTION_STRING = process.env.DB;

app.get('/getSignedInVar', (req, res) => {
    if (req.session.user) {
        res.send({message: "User is signed in", error: 0, signedIn: true})
    } else {
        res.send({message: "User not signed in", error: 1, signedIn: false})
    }
})

app.get('/eventFeed', (req, res) => {

    // if req.session.user
    let loggedIn = undefined;
    //if (req.session.user) { loggedIn = true } else { loggedIn = false }
    req.session.user ? loggedIn = true : loggedIn = false;

    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        let dbo = db.db("jive-database");
        let collection = dbo.collection('events');
        collection.find().toArray(function(err, result) {
            let array = result;
            console.log(array);
            res.send({array: array, loggedIn: loggedIn});
        })
    });
})
app.post('/logout', (req, res) => {
    if (signedIn) {
        signedIn = false;
        req.session.destroy();
        res.send({message: "User has logged out", error: 0, signedIn: false});
        //window.location.reload(true);
    } else {
        res.send({message: "User not signed in", error: 1, signedIn: false})
    }
})
app.post('/createEvent', (req, res) => {
    //res.set('Content-Type', 'text/json');

    let title = req.body.title;
    let location = req.body.location;
    let description = req.body.description;

    let eventObject = {
        "title": title,
        "location": location,
        "description": description,
        "interested": [],
        "going": []
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
                res.send({message: "User already exists", error: 1, signedIn: false});
            } else {
                collection.insertOne(userObject);
                signedIn = true;
                req.session.user = req.body.user;
                req.session.password = req.body.password;
                res.send({message: "User successfully created", error: 0, signedIn: true});
            }
        });
    });
})

app.post('/loginUser', (req, res) => {
    
    let user = req.body.user;
    let password = req.body.password;

    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, db) {
        let dbo = db.db("jive-database");
        let collection = dbo.collection('users');
        collection.findOne({user: user}, function(err, result) {
            if (result) {
                if (result.password === password) {
                    console.log(result);
                    signedIn = true;
                    req.session.user = req.body.user;
                    req.session.password = req.body.password;
                    res.send({message: "Successfully signed in", error: 0, signedIn: true});
                } else {
                    res.send({message: "Password incorrect", error: 2, signedIn: false});
                }
            } else {
                collection.insertOne(userObject);
                res.send({message: "User does not exist", error: 1, signedIn: false});
            }
        });
    });
    
})


module.exports = app;