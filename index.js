
const express=require("express")
const {connection} = require("./config/db")
const {userRouter} =  require("./routes/user.route")
const {postRouter} =  require("./routes/post.route")
const {authentication} = require("./middlewares/authentication.middleware")
require("dotenv").config();
const cors=require("cors")


const app=express()

app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use(authentication)
app.use("/posts", postRouter)


app.listen(process.env.port, async() => {
    try{
        await connection
        console.log('"Connected to Database')
        console.log(`Listening on port ${process.env.port}`)
    }catch(err){
        console.log('"Unable to connect Database')
        console.log(err)
    }
})