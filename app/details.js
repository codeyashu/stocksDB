//dependencies
var express = require('express');
var path = require('path');
var request = require('request');
var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});
var googleStocks = require('google-stocks');

//export details.js
var exports = module.exports = {}

//query module
var query = require('./query');
var app = require('../server');

/*// middleware to populate clist & clen
app.use(function(req, res, next){
   query.companyList(function(err, data){
      if(!err) {
        console.log(data.clist);
         req.clist = data.clist;
         req.clen = data.clen;
      }
      next();
   });
});
*/

query.companyList(function(err, data){
      if(err) {
         console.log(err);
      } 
      else {
        for(var i = 0; i < Object.keys(data.clist).length;  i++){
           var comp = data.clist[i].exchange+ ':' +data.clist[i].ticker;
           var cid = data.clist[i].id;
           (function(_id) {
               googleStocks([comp])
               .then(function(data){
                 console.log((data[0].lt));
                 r.table('company').get(parseInt(_id)).
                     update({quote:{lastTradeTime:data[0].lt,
                         lastTradePrice:data[0].l_cur, change:data[0].c, 
                             changePercent:data[0].cp}}).run()
                 .then(function(results){
                   console.log(results);
                 })
                 .catch(function(err){
                   console.log(err);
                 });
               })
               .catch(function(error){
                 console.log(error);
               });
            })(cid);
        }
      }
});


/* working codeeee
query.companyList(function(err, data){
      if(err) {
         console.log(err);
      } else {
        console.log(data.clist[0].exchange);
         console.log(data.clist[0].ticker);
      }
});

googleStocks(['NASDAQ:AAPL','NASDAQ:MSFT','NASDAQ:FB','NYSE:F','NSE:MARUTI','NSE:TATAMOTORS'], function(error, data){
  console.log(data);
  for(var i = 0;i < 6;i ++){
    r.table('company').get(parseInt(data[i].id)).update({quote:{lastTradeTime:data[i].lt, lastTradePrice:data[i].l_cur, change:data[i].c, changePercent:data[i].cp}}).run();
  }
})


*/


////test
/*
query.companyList(function(err, data){
      if(err) {
         console.log(err);
      } 
      else {
        
        for(var i = 0;i < 6;i++){
           var comp = data.clist[i].exchange+ ':' +data.clist[i].ticker;
           console.log(comp);
           var cid = data.clist[i].id;
           console.log(cid);
           
           googleStocks([comp])
           .then(function(data){
             console.log((data[0].lt));
             r.table('company').get(parseInt(cid)).update({quote:{lastTradeTime:data[0].lt, lastTradePrice:data[0].l_cur, change:data[0].c, changePercent:data[0].cp}}).run()
             .then(function(results){
               console.log(results);
             })
             .catch(function(err){
               console.log(err);
             });
           })
           .catch(function(error){
             console.log(error);
           });
        }
      }
});
*/





          /* googleStocks([comp], function(error, data){
             if(error) {
               console.log(err);
             } 
             else {
               console.log(data);
               r.table('company').get(parseInt(data.clist[i].id)).update({quote:{lastTradeTime:data.clist[i].lt, lastTradePrice:data.clist[i].l_cur, change:data.clist[i].c, changePercent:data.clist[i].cp}}).run();
             }
           })*/
        








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
/*

query.companyList()
       .then(function(data){

         for(var i = 0;i < 6;i ++){
           var comp = data.clist[i].exchange+ ':' +data.clist[i].ticker;
           
           googleStocks([comp])
           .then(function(data){
             console.log(data);
             r.table('company').get(parseInt(data.clist[i].id)).update({quote:{lastTradeTime:data.clist[i].lt, lastTradePrice:data.clist[i].l_cur, change:data.clist[i].c, changePercent:data.clist[i].cp}}).run();
           })
           .catch(function(error){
             console.log(error);
           });
        }
      })

      .catch(function(err){
        console.log(err);
      });
        
        
      

*/
