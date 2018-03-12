var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var fetchJson = require('node-fetch-json');
var path = require('path');
var db;
var app = express();

app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) {
    console.error("Failed to connect to database!");
    console.log(error);
  } else {
    console.log("Connected to database!");
    db = client.db('chattdb');
  }
});

// /chatt är kopplad till frontend mappen
app.use('/chatt', express.static(path.join(__dirname, 'frontend')));

// Skapar lite fejkuppgifter för testning
app.put('/', function (request, respone) {
  db.collection('users').insertMany([{
    "firstName": "Kristian",
    "surname": "Andersson",
    "username": "kirre253",
    "messages": {
      "2018-03-08, 14:25:52": "Hej på dig! :)",
      "2018-03-08, 14:39:22": "Svara då för i helvete! >:("
    }
  },
  {
    "firstName": "Robin",
    "surname": "Lundström",
    "username": "robban1337_xXdragonSlayerXx",
    "messages": {
      "2018-03-08, 14:40:28": "Lugna ned dig din surballe..",
      "2018-03-08, 14:42:50": "Hej"
    }
  }]), function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
      response.send(result);
    }
  };
});


// Hämtar alla fejkuppgifter och skickar dem till en array
app.get('/', function (request, response) {
  db.collection('users').find().toArray(function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
      response.send(result);
    }
  });
});


app.listen(3000, function () {
  console.log('The server is running!')
});
