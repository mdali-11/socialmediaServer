const express=require("express")
const jwt = require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config();


const {userModel} = require("../models/user.model")

const userRouter = express.Router()

userRouter.post("/register" , async(req,res) => {
    const {name,email,gender,password} = req.body;
    try{
        bcrypt.hash(password, 4, async(err, hash) => {
            if(err){
                console.log(err)
                res.send("Error in hashing")
            }else{
                let user = new userModel({name,email,gender,"password":hash})
                await user.save();
                res.send({msg:"User Registered"})
            }
        });
    }catch(err){
        console.log(err)
        res.send({msg:"Registration Failed"})      
    }
})


userRouter.post("/login" , async(req,res) => {
    const {email,password} = req.body;
    try{
        
        const user= await userModel.find({email})

        if(user.length>0){

            bcrypt.compare(password, user[0].password, async(err, result)=> {
                // result == false
                if(result){
                    const token=jwt.sign({ userID:user[0]._id}, process.env.secret_key,{expiresIn:"1h"})
                    res.send({msg:"Login Successful" , token})
                }else{
                    res.send("Wrong Credentials")
                }
            });        
        }else{
            res.send("Wrong Credentials")
        }
       
    }catch(err){
        console.log(err)
        res.send({msg:"Login Failed"})      
    }
})

module.exports={
    userRouter
}