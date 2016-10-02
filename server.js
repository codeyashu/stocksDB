//dependencies
var express = require('express');
var rethink = require('rethinkdbdash');
var request = require('request');
var expressLayouts = require('express-ejs-layouts');

var app = express();
var r = rethink();

//use ejs and express layouts
app.set('view engine','ejs');
app.use(expressLayouts);


//route our app
var router = require('./app/routes');
app.use('/',router);


//public folder
app.use(express.static(__dirname + '/public'));

//start the server
app.listen(3000, function () {
  console.log('Server started!');
});




//get stock quote in json
var url = 'https://www.google.com/finance/info?q=';
var subquote;
request({
    url: url + 'NASDAQ%3aGOOG',
    json: true
},   
    function(error, response, subquote){
        if(!error && response.statusCode === 200){
          console.log("success")
          var quote = JSON.parse(subquote.substring(4));
          console.log(quote)
          console.log(typeof quote)
        }  
})