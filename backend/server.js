var express = require('express');
var bodyParser = require('body-parser');
var fetchJson = require('node-fetch-json');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db;
var app = express();

app.use(bodyParser.json());

// pratar med databasen
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
app.use('/', express.static(path.join(__dirname, '..', 'frontend')));
app.use('/gruppchatt', express.static(path.join(__dirname, '..', 'frontend')));
app.use('/privatchatt', express.static(path.join(__dirname, '..', 'frontend')));


// OBS! tar bort all data i databasen
// app.post('/', function (request, response) {
//   db.collection('messages').remove({}, function (error, result) {
//     if (error) {
//       response.status(500).send(error);
//       return;
//     } else {
//       response.send(result);
//     }
//   })
// })



/*-------------------------------register---------------------------------*/

app.post('/api/register', function(request, response) {
  db.collection('users').find({
    "userName": request.body.userName
  }).toArray(function(error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else if (result.length == 0) {
      db.collection('users').insert(request.body,
        function(error, result) {
          if (error) {
            response.status(500).send(error);
            return;
          } else {
            response.send(result);
          }
        });
    } else if (result.length >= 1) {
      response.status(409).send();
    }
  })
});

app.get('/api/register', function(request, response) {
  db.collection('users').find({}).toArray(function(error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
      response.send(result);
    }
  })
});



/*-------------------------------inlogg---------------------------------*/

// app.post('/api/inlogg', function (request, response) {
//   db.collection('users').find({"userName": request.body.userName}).toArray(function (error, uResult) {
//     if (error) {
//       response.status(500).send(error);
//       return;
//     } else if (uResult.length && pResult.length == 1) {
//
//     } else if (uResult.length == 0) {
//       response.status(418).send();
//     }
//   });
//   db.collection('users').find({"passWord": request.body.passWord}).toArray(function (error, pResult) {
//     if (error) {
//       response.status(500).send(error);
//       return;
//     } else if (pResult.length && uResult.length == 1) {
//
//     } else if (pResult.length == 0) {
//       response.status(418).send();
//     }
//   });
// });




// app.post('/api/inlogg', function (request, response) {
//   db.collection('users').insert(request.body,
//     function (error, result) {
//       if (error) {
//         response.status(500).send(error);
//         return;
//       } else {
//         response.send(result);
//       }
//     }
//   )
// });
//
//
  app.get('/api/inlogg', function (request, response) {
    db.collection('users').find({}).toArray(function (error, result) {
      if (error) {
        response.status(500).send(error);
        return;
      } else {
          response.send(result);
        }
      });
    });


/*---------------------gruppchatten----------------------------------*/
// lägger till data i databasen för gruppchatten
app.post('/api/gruppchatt', function (request, response) {
  db.collection('messages').update(request.body, { $set: { "time": new Date() } }, { upsert: true },
  function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
      response.send(result);
    }
  });
});


// skickar datan från chattdb till react gruppchatten
app.get('/api/gruppchatt', function (request, response) {
  db.collection('messages').find({}).toArray(function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
        response.send(result);
      }
    });
  });


/*--------------------------privatchatten---------------------------------*/
app.post('/api/privatchatt', function (request, response) {
  db.collection('privmessages').update(request.body, { $set: { "time": new Date() } }, { upsert: true },
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



app.get('/api/privatchatt', function (request, response) {
  db.collection('privmessages').find({}).toArray(function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
        response.send(result);
      }
    });
  });


app.listen(3000, function () {
  console.log('The server is running.')
});
