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

// express visar vad som finns inuti frontend mappen (så att localhost:3000/ får content som ligger i frontend)
//när jag lägger till '/gruppchatt' så fungerar det inte att hämta datan från chattdb?
app.use('/gruppchatt', express.static(path.join(__dirname, '..', 'frontend')));

// OBS! tar bort all data i databasen(fungerar ej..)
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

/*---------------------gruppchatten----------------------------------*/
// lägger till data i databasen för gruppchatten
<<<<<<< HEAD
app.post('/api/gruppchatt', function (request, response) {
  db.collection('messages').insert(request.body,
    function (result, error) {
=======
app.post('/gruppchatt', function (request, response) {
  db.collection('users').insert(request.body,
    function (error, result) {
>>>>>>> 40080f12a77179928b4dffcc3e19404159f17b57
      if (error) {
        response.status(500).send(error);
        return;
      } else {
        response.send(result);
      }
    }
  )
});

// skickar datan från chattdb till react gruppchatten
app.get('/api/gruppchatt', function (request, response) {
  db.collection('messages').find({}).toArray(function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    }
    response.send(result);
  });
});

// users collection
app.post('/api/gruppchatt', function (request, response) {
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
// users collection
app.get('/api/gruppchatt', function (request, response) {
  db.collection('users').find({}).toArray(function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    }
    response.send(result);
  });
});


/*--------------------------privatchatten---------------------------------*/
// lägger till data i databasen för privatchatten
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

// skickar datan från chattdb till react privatchatten
app.get('/privatchatt', function (request, response) {
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


app.listen(3000, function () {
  console.log('The server is running.')
});
