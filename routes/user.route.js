const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
userRouter.post("/register", (req, res) => {
  const payload = req.body;
  try {
    bcrypt.hash(payload.password, 10, async (err, hash) => {
      if (err) {
        res.status(400).send({ msg: err });
      }
      const userData = new UserModel({ ...payload, password: hash });
      console.log(userData);
      await userData.save();
      res.status(400).send({ msg: `user has registered ${userData}` });
    });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

userRouter.post("/login",async(req, res)=>{
    const {email,password}=req.body;

    try {
        const user=await UserModel.find({email})
        if(user){
            bcrypt(user.password,)
        }
    } catch (error) {
        res.status(400).send({ msg: error }); 
    }
})

module.exports = {
  userRouter,
};
