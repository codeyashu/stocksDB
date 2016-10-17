//dependencies
var express = require('express');
var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

var app = module.exports = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

//use ejs and express layouts
app.set('view engine','ejs');
app.use(expressLayouts);

//use bodyParser
app.use(bodyParser.urlencoded({extended: true}));


//socket
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});




//details.js
var details = require('./app/details');


/* look for changes

r.table('company').changes().run()
.then(function(cursor){
    cursor.each(console.log);
})
.error(function(err){
    console.log(err);
})

*/


//route our app
var router = require('./app/routes');
app.use('/',router);

//public folder
app.use(express.static(__dirname + '/public'));

//start the server
app.listen(3000, function () {
  console.log('Server started!');
});