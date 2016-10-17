//dependencies
var request = require('request');
var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});
var googleStocks = require('google-stocks');

//export details.js
var exports = module.exports = {}

googleStocks(['NASDAQ:AAPL','NASDAQ:MSFT','NASDAQ:FB','NYSE:F','NSE:MARUTI','NSE:TATAMOTORS'], function(error, data){
  console.log(data);
  for(var i = 0;i < 6;i ++){
    r.table('company').get(parseInt(data[i].id)).update({quote:{lastTradeTime:data[i].lt, lastTradePrice:data[i].l_cur, change:data[i].c, changePercent:data[i].cp}}).run();
  }
})



//------ OLD CODE------//

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
          
        }  
})
*/