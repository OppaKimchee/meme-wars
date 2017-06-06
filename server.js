var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
// var memes = require('./routes/memes');

require('dotenv').config();
require('./config/database');

var app = express();

app.use(logger('dev'));

// Configure both serve-favicon & static middlewares
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

// app.use(memes);

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
var port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});