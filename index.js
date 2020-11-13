const express=require("express");
const app=express();
const mongoose=require("mongoose");
const userRoutes=require('./routes/userRoutes');
const PORT=process.env.PORT | 1200;
const bodyParser=require("body-parser");
app.use(bodyParser.json());
var dbURL="mongodb+srv://mindtree:mindtree@cluster0.wuc4i.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(dbURL);

mongoose.connection.on("connected",()=>{
    console.log("conected to mongoDB");
})
app.use("/",userRoutes);
app.listen(PORT,()=>{
    console.log("listening");
})
