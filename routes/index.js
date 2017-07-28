var express = require('express');
var router = express.Router();
var Cart=require('../models/cart');
var Product=require('../models/product');



/* GET home page. */
router.get('/', function(req, res, next) {
    var successMsg=req.flash('success')[0];
    Product.find(function (err,docs) {
        var productChunk=[];
        var chunkSize=3;
        for(var i=0;i<docs.length;i+=chunkSize){
            productChunk.push(docs.slice(i,i+chunkSize));
        }
        res.render('shop/index', { title: 'Shopping Cart',products:productChunk,successMsg:successMsg,noMessage:!successMsg});
    })

});

router.get('/add-to-cart/:id',function (req,res,next) {
   var productId=req.params.id;
   var cart=new Cart(req.session.cart ? req.session.cart: {item:{}});

   Product.findById(productId,function (err,product) {
       if(err){
           res.redirect('/');
       }
       cart.add(product,product.id);
       req.session.cart=cart;
       /*console.log(req.session.cart);*/
       res.redirect('/');
   })
});

router.get('/shopping-cart',function(req,res,next) {
    if (!req.session.cart){
        res.render('shop/shopping-cart',{products:null});
    }
    else {
        var cart = new Cart(req.session.cart);
        console.log(cart.generateArray());
        res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
    }
});

router.get('/checkout',function (req,res,next) {
    if (!req.session.cart){
        res.redirect('/shopping-cart');
    }
    var errMsg=req.flash('error')[0];
    var cart=new Cart(req.session.cart);
    res.render('shop/checkout',{total:cart.totalPrice,errMsg:errMsg,noError:!errMsg});

});

router.post('/checkout',function (req,res,next) {
    if (!req.session.cart){
        res.redirect('/shopping-cart');
    }
    var cart=new Cart(req.session.cart);
    var stripe = require("stripe")(
        "sk_test_ygZ5Hgl8zLzrRoYHOnvpn1Qn"
    );
    stripe.charges.create({
        amount:cart.totalPrice*100,
        currency:"usd",
        source:req.body.stripeToken,
        description:"test charge"

    },function (err,charge) {
        if (err){
            req.flash('error',err.message);
            res.redirect('/checkout');
        }
        else {
            req.flash('success', 'Successfully bought product');
            req.session.cart = null;
            console.log("payment success");
            res.redirect('/');
        }
    });

});

module.exports = router;
