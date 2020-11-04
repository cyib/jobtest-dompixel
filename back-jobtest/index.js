const env = process.env.NODE_ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./routes/index');

var app = express();

app.use(function(req, res, next) {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache'); 
  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Range');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Access-Control-Allow-Origin'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method == 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var port = process.env.PORT || 3000;

app.use('/', index);

if (env == 'production') {
  app.use(express.static(path.join(__dirname, 'front-app', 'build')));
  app.get('*', function (req, res) {
    console.log(req);
    res.sendFile(path.join(__dirname, 'front-app', 'build', 'index.html'))
  });
}

app.listen(port, function () {
  console.log('Server started on %s', port);
});

