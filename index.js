const express=require("express")
const { connection } = require("./db")
require("dotenv").config()
const app=express()
const {userRouter}=require("./routes/user.route")
app.use(express.json())


app.use("/users",userRouter)
const port=process.env.Port || 4000
app.listen(port,async()=>{
    try {
        await connection
        console.log("connected to DB");
        console.log(`server is connected at port ${port}`)
    } catch (error) {
        console.log(error)
    }
})