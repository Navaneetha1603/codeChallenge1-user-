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
        // const users=await User.find({"_id":id});
        const data=await User.findById(id);
        console.log("data"+data);
    if(!data){
        res.status(200).send({message:`cannot find the is=${id}`})
    }
    else
    return res.json({data:users});}
        catch(err){
            return res.status(400).json(err)
        }
}
const updateUserId=async (req,res)=>{
    const id=req.params.Id;
    try{
    let data=await User.findByIdAndUpdate(id,req.body)
    console.log("data"+data);
    if(!data){
        res.status(200).send({message:`can not update the is=${id}`})
    }
    else
      res.send({message:`updated successfully`})
    }
    catch(err){
        return res.status(200).json(err);
    }

}
//update the username
// const updateUserId=(req,res)=>{
//    if(!req.body){
//        return res.status(400).send({
//         message:"data to update can not be empty!"
//        });
//    }
//    const id=req.params.Id;
//    User.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
//    .then(data=>{
//        if(!data){
//            res.status(200).send({
//                message:`cannot update the id =${id}`
//            });
//        }
//        else res.send({message:`updated successfully`})
//    })
//    .catch(err=>
//     res.status(200).send({
//         message:"error is updating"+id
//     }))
// }
// const updateUserId=async(req,res)=>{
//     let id=req.params.Id;
//     // user.firstname=req.body.firstname;
//     // let fname=user.firstname;
//     // let lname=user.lastname=req.body.lastname;
//     // let emailId=user.emailId=req.body.emailId;
//     // let age=user.age=req.body.age;
//     // console.log("fname:"+fname +"lname:"+lname +"emailId:"+emailId+"age:"+age);
//     console.log(id);
//     // console.log("fname"+fname);
//     try{
//         const users=await User.updateOne({"_id":id},
//         // await User.updateOne({"_id":id},
//         {
//             $set:{"firstname":"Neethu"}
//             // $set:{"firstname":fname,"lastname":lname,"emailId":emailId,"age":age}
//             // $set:{"firstname":fname}
//         }
//         );
        
//         return res.json({message:"updated"})
//     }
//     catch(err){
//         return res.status(400).json(err)
//     }
// }
//deleteId 
const deleteUserId=async(req,res)=>{
    let id=req.params.Id;
    console.log(id);
    //if u want to delete many details
    // User.deleteMany({});
    try{
        const users=await User.findByIdAndDelete(id);
        if(!users){
        res.status(200).send({message:`can not find  the id=${id}`})
        }
        else{
        return res.json({message:"deleted"})}
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