//dependencies
var express = require('express');
var path = require('path');

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

//companies page
router.get('/company', function(req,res){
    res.render('pages/company');
});


//about page
router.get('/about', function(req,res){
    res.render('pages/about');
});
