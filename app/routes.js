//dependencies
var express = require('express');
var path = require('path');

//create router object
var router = express.Router();

//export router
module.exports = router;

//home page
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
});

//get quote page
router.get('/quote', function(req, res) {
    res.sendFile(path.join(__dirname, '../quote.html'));
});