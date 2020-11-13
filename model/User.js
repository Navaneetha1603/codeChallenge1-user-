const mongoose=require("mongoose");

const userSchema =new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String},
    emailId:{type:String,required:true},
    age:{type:Number,required:true},
})
//create the model of the user
const User= mongoose.model("User",userSchema);

module.exports=User;