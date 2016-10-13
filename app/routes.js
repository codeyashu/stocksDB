//dependencies
var express = require('express');
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

//home page
router.get('/', function(req, res) {
    res.render('pages/home');
});

//get quote page
router.get('/quote', function(req, res) {
    res.render('pages/quote');
});

router.post('/quote', function(req, res){
    console.log(req.body.email);
    console.log(req.body.password);
    res.send('Awesome ' + req.body.email);
});


//--companies page--//
var clist = {};
var len;
router.get('/company', function(req,res){

    //query to get companies list 
    r.table('company').pluck('name').run()
    .then(function(response){
       clist = Object.assign({}, response)
      // clist = response;
    })
    .error(function(err){
	console.log(err);
    })
    //number of companies
    len = Object.keys(clist).length;

     console.log('companies passed!')  
    res.render('pages/company', {
        clist: clist,
        x:len
    });
});


//--about page--//
router.get('/about', function(req,res){
    res.render('pages/about');
});


