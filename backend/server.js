var express = require('express');
var bodyParser = require('body-parser');
var fetchJson = require('node-fetch-json');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db;
var app = express();

app.use(bodyParser.json());

// pratar med databasen!!
MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) {
    console.error('Failed to connect to the database!');
    console.log(error);
  } else {
    console.log('Successfully connected to the database!');
    db = client.db('chattdb');
  }
});

// express visar vad som finns inuti frontend mappen
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// OBS! tar bort all data i databasen
// app.post('/', function (request, response) {
//   db.collection('users').remove({}, function (error, result) {
//     if (error) {
//       response.status(500).send(error);
//       return;
//     } else {
//       response.send(result);
//     }
//   })
// })


// lägger till data i databasen för gruppchaten
app.post('/', function (request, response) {
  db.collection('users').insert(request.body,
    function (error, result) {
      if (error) {
        response.status(500).send(error);
        return;
      } else {
        response.send(result);
      }
    }
  )
});

// skickar datan från chattdb till react
app.post('/', function (request, response) {
  db.collection('users').find(request.body,
    function (result, error) {
      if (error) {
        response.status(500).send(error);
        return;
      } else {
        response.send(result);
      }
    }
  )
});

app.post('/privatchatt', function (request, response) {
  db.collection('users').insert(request.body,
    function (result, error) {
      if (error) {
        response.status(500).send(error);
        return;
      } else {
        response.send(result);
      }
    }
  )
});


app.listen(3000, function () {
  console.log('The server is running.')
});
