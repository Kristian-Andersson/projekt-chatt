var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var fetchJson = require('node-fetch-json');
var path = require('path');
var db;


MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) {
    console.error("Failed to connect to database!");
    console.log(error);
  } else {
    console.log("Connected to database!");
    db = client.db('chattdb');


    // Tar bort alla värdena i collectionen users
    db.collection('users').remove({}, function (error, result) {
      if (error) {
        response.status(500).send(error);
        return;
      } else {
        response.send(result);
      }
    });


    // Skapar lite fejkuppgifter för testning
    db.collection('users').insertMany([{
      "firstName": "Kristian",
      "surname": "Andersson",
      "username": "kirre253",
      "messages": {
        "2018-03-08, 14:25:52": "Hej på dig! :)",
        "2018-03-08, 14:39:22": "Vad gör du?"
      }
    },
    {
      "firstName": "Robin",
      "surname": "Lundström",
      "username": "robban976",
      "messages": {
        "2018-03-08, 14:42:50": "Hejsan"
      }
    }], function (error, result) {
      if (error) {
        response.status(500).send(error);
        return;
      } else {
        response.send(result);
      }
    });
  }
});
