//dependencies
var express = require('express');
var rethink = require('rethinkdbdash');
var request = require('request');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

var app = express();
var r = rethink();

//use ejs and express layouts
app.set('view engine','ejs');
app.use(expressLayouts);

//use bodyParser
app.use(bodyParser.urlencoded({extended: true}));


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
    function(error, response, quote){
        if(!error && response.statusCode === 200){
          console.log("success")
          var objectquote = JSON.parse(quote.substring(4));
          var stringquote = (quote.substring(4));
          console.log(stringquote)
          console.log(typeof stringquote)
          console.log(objectquote)
          console.log(typeof objectquote)
        //  console.log(JSON.stringyfy(stringquote));
          console.log(objectquote[0].id)
          console.log(objectquote[0].t)
          console.log(objectquote[0].t)
        }  
      //  r.db('stocks').tableCreate('test').run()
        //  if(err) throw err;
          
       //   r.db('stocks').table('company').insert({ticker:objectquote[0].t}).run()
       //    r.db('stocks').table('company').insert({id:objectquote[0].id}).run()
       //     if(err) throw err;
           
       //   })

       // })

       





        
})





