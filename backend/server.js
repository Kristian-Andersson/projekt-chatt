var express = require('express');
var bodyParser = require('body-parser');
var fetchJson = require('node-fetch-json');
var path = require('path');
var app = express();

app.use(bodyParser.json());

// /chatt är kopplad till frontend mappen
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.post('/', function (request, response) {
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
