//dependencies
var express = require('express');
var request = require('request');
var path = require('path');
var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});

//create router object
var router = express.Router();

//export router
module.exports = router;



//get company id and names
var len;
var clist = {};
//query to get companies list 
r.table('company').pluck('id','name').orderBy('name').run()
  .then(function(response){
     clist = response;
      //number of companies
     len = Object.keys(clist).length;
  })
 .error(function(err){
    console.log(err);
 })   


//home page
router.get('/', function(req, res) {
    console.log('served homepage');
    res.render('pages/home');
});


//--companies page--//
router.get('/company', function(req,res){  
      console.log('served companies page')
      res.render('pages/company', {
        clist: clist,
        x:len
      }); 
});


//--about page--//
router.get('/about', function(req,res){
    console.log('served about page');
    res.render('pages/about');
});


//get quote page

var selectedc;
router.get('/quote', function(req, res) {
    console.log('served getquotespage')
    res.render('pages/quote',{
        clist: clist,
        x:len
    });
});

router.post('/quote', function(req, res){
   selectedc = req.body.company;
   console.log(selectedc);

    res.render('pages/cdetail',{
    });
});



