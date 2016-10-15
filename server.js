//dependencies
var express = require('express');
var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

var app = express();


//use ejs and express layouts
app.set('view engine','ejs');
app.use(expressLayouts);

//use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

//details.js
var details = require('./app/details');

//route our app
var router = require('./app/routes');
app.use('/',router);

//public folder
app.use(express.static(__dirname + '/public'));

//start the server
app.listen(3000, function () {
  console.log('Server started!');
});