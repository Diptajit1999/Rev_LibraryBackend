const roleAccess=(req,res,next)=>{
    const {role}=req.body;
    if(role){
        console.log("Admin is here")
        next()
    }else{
        res.status(300).send({msg:"You are not the admin"})
    }
}

module.exports={
    roleAccess
}