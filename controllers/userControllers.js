const User=require("../model/User");
const { checkout } = require("../routes/userRoutes");

const getUsers=async(req,res)=>{
    try{
        const users=await User.find({});
        // return res.json({message:'hello user'});
        return res.json({data:users});
    }
    catch(err){
        return res.status(404).json(err);
    }
}

//create users
const createUser=async(req,res)=>{
    const user=new User();
    user.firstname=req.body.firstname;
    user.lastname=req.body.lastname;
    user.emailId=req.body.emailId;
    user.age=req.body.age;
    //email validation
    // let count;
    let email=user.emailId;
    let length=email.length;
    console.log(length);
    console.log(email);
    let count=0;
    for(let i=0;i<length;i++)
    {
        if(email[i]>='A' && email[i]<='z' || email[i]=='.' || email[i]=='@' )   {
            // console.log("hello");
            count++;
        }
    }
    let flag=0;
    if(count==length){
        flag=1;
    }
    if(flag==1){
   if(user.firstname!=null){
    if(user.age>=21 && user.age<=60){
    try{
        if(user.lastname==null){
        user.lastname="NA";}
        if(!user.lastname){
            user.lastname=req.body.lastname;
        }
        await user.save();
        return res.json({message:"record inserted"});
    }
    catch(err){
        return res.status(403).json(err);
     }
 }
       else{
           return res.json({message:"age should be between 21 to 60"});
       }
}
else{
    return res.json({message:"firstname should not be null"});
}
    }
    else{
    return res.json({message:"email should contain letters"});

    }
}
//get the users by using id
const userById=async(req,res)=>{
    let id=req.params.Id;
    console.log(id);
    try{
        const users=await User.find({"_id":id});
        return res.json({data:users});}
        catch(err){
            return res.status(400).json(err)
        }
}
//update the username
const updateUserId=async(req,res)=>{
    let id=req.params.Id;
    console.log(id);
    try{
        const users=await User.updateOne({"_id":id},
        {
            $set:{"firstname":"Neethu"}
        }
        );
        return res.json({message:"updated"})
    }
    catch(err){
        return res.status(400).json(err)
    }
}
//deleteId 
const deleteUserId=async(req,res)=>{
    let id=req.params.Id;
    console.log(id);
    try{
        const users=await User.findByIdAndDelete(id);
        return res.json({message:"deleted"})
    }
    catch(err){
        return res.status(400).json(err)
    }
}
module.exports={ 
    getUsers,
    createUser,
    userById,
    updateUserId,
    deleteUserId
}