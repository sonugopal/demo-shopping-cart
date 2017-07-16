var mongoose=require('mongoose');

var Product=require('../models/product');
mongoose.connect('mongodb://localhost/shopping');

var products=[new Product({
    imagePath:"https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    tittle:"Gothic video game",
    description:"awesome game",
    price:10
}),new Product({
    imagePath:"https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    tittle:"Gothic video game",
    description:"awesome game",
    price:10})];
var done=0;
for (var i=0;i<products.length;i++){

    products[i].save(function (err,result) {
        if(err){
            console.log("error on insert"+err);
        }
        done++
        if (done===products.length){
            exit();
        }
    });
    function exit() {
        mongoose.disconnect();
    }
}

