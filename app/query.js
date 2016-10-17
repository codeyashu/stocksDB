//dependencies
var express = require('express');
var path = require('path');
var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});


//query to get companies list 
exports.companyList = function(next){
    r.table('company').run()
    .then(function(response){
       var list = {
         clist: response,
         clen: Object.keys(response).length
      };
     next(null, list);
   })
  .error(function(err){
     console.log(err);
     next(err);
  })   
};