const express=require("express");
const router=express.Router();
const User=require("../model/User");
const controllers=require("../controllers/userControllers");

// router.get("/test",(req,res)=>{
//     return res.json({message:"hello"});
// })

router.get("/users",controllers.getUsers);
router.post("/users",controllers.createUser);
router.get("/users/:Id",controllers.userById);
router.patch("/users/:Id",controllers.updateUserId);
router.delete("/users/:Id",controllers.deleteUserId);
module.exports=router;