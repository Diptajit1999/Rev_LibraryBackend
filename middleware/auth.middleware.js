const jwt=require("jsonwebtoken")
require("dotenv").config()

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]

    try {
        if(token){
            jwt.verify(token,process.env.AcessKey,(err,decoded)=>{
                console.log(decoded)
                if(decoded){
                    req.body.userID=decoded.userID
                    req.body.username=decoded.username
                    req.body.role=decoded.role

                    next()
                }else{
                    res.status(200).send({msg:err})
                }
            })
        }else{
            res.status(200).send({msg:"You are not authorized,Please insert token"})
        }
    } catch (error) {
        res.status(400).send({msg:error})
    }
}

module.exports={
    auth
}