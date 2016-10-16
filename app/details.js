//dependencies
var request = require('request');
var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});


//export details.js
var exports = module.exports = {}

//query to company table
var len;
var ctable = {};
//query to get companies list 
r.table('company').orderBy('name').run()
  .then(function(response){
     ctable = response;
      //number of companies
     len = Object.keys(ctable).length;
  })
 .error(function(err){
    console.log(err);
 })   


/*
//get stock quote in json
var url = 'https://www.google.com/finance/info?q=';
var subquote;

request({
    url: url + 'NASDAQ%3aAAPL,NASDAQ%3aFB,NYSE%3aF',
    json: true
},   
    function(error, response, quote){
        if(!error && response.statusCode === 200){
          console.log("success")
          var objectquote = JSON.parse(quote.substring(4));
          var stringquote = (quote.substring(4));
          console.log(objectquote)
          console.log(objectquote[2].t)
          for(var i = 0; i < len; i++){
            r.table('')
          }
        }  
})
*/