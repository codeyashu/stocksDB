//dependencies
var express = require('express');
var request = require('request');
var path = require('path');
var r = require('rethinkdbdash')({
  port: 28015,
  host: 'localhost',
  db: 'stocks'
});


//query module
var query = require('./query')
var app = require('../server');

// middleware to populate clist & clen
app.use(function(req, res, next){
   query.companyList(function(err, data){
      if(!err) {
         req.clist = data.clist;
         req.clen = data.clen;
      }
      next();
   });
});

query.companyList(function(err, data){
      if(err) {
         console.log(err);
      } else {
         console.log(data.clist[0].id);
         console.dir(data.clist);
      }
});



//create router object
var router = express.Router();

//export router
module.exports = router;

//home page
router.get('/', function(req, res) {
    console.log('served homepage');
    res.render('pages/home');
});


//--companies page--//
router.get('/company', function(req,res){  
    console.log('served companies page')
    res.render('pages/company', {
      clist: req.clist,
      x: req.clen
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
    console.log('served getquotes page')
    res.render('pages/quote',{
        clist: req.clist,
        x: req.clen
    });
});

router.post('/quote', function(req, res){
   selectedc = req.body.company;
   console.log(selectedc);

    res.render('pages/cdetail',{
    });
});



