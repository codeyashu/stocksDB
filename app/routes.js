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
    

});