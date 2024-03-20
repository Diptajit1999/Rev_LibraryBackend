const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
require("dotenv").config()
userRouter.post("/api/register", (req, res) => {
  const payload = req.body;
  try {
    bcrypt.hash(payload.password, 10, async (err, hash) => {
      if (err) {
        res.status(200).send({ msg: err });
      }
      const userData = new UserModel({ ...payload, password: hash });
      console.log(userData);
      await userData.save();
      res.status(201).send({ msg: `user has registered ${userData}` });
    });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

userRouter.post("/api/login",async(req, res)=>{
    const {email,password}=req.body;

    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                  const token=jwt.sign({userID:user._id,username:user.name,role:user.isAdmin},process.env.AcessKey)
                    return res.status(201).send({ msg: "user has logged in",token:token });
                }
                res.status(400).send({ msg: err });
            })
        }
    } catch (error) {
        res.status(400).send({ msg: error }); 
    }
})


module.exports = {
  userRouter,
};
