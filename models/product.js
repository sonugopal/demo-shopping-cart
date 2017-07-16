 /**
 * Created by sonu on 15/7/17.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema=new Schema({
    imagePath:{type:String, required:true},
    tittle:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true}
});

module.exports=mongoose.model('Products',schema);