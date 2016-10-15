var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});
var request = require('request');




//export details.js
var exports = module.exports = {}

console.log("fuckkk success");


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
          console.log("serverrrrr" +stringquote)
          console.log(typeof stringquote)
          console.log(objectquote)
          console.log(typeof objectquote)
        
          console.log(objectquote[0].id)
          console.log(objectquote[0].t)
        }  
})
