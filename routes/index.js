var express = require('express');
var Product=require('../models/product');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find(function (err,docs) {
        console.log(docs);
        var productChunk=[];
        var chunkSize=3;
        for(var i=0;i<docs.length;i+=chunkSize){
            productChunk.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/index', { title: 'Shopping Cart',products:productChunk});
    })

});

module.exports = router;