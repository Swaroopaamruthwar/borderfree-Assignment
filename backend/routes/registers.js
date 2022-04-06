const express = require("express")
const bcrypt = require('bcryptjs')
//const connection = require("../DatabaseConnection/connection")
const router = new express.Router();
const UserData = require("../model/register")
const jwt = require("jsonwebtoken");

router.post("/registers",async(req,res)=>{
    const {Email,Password}= req.body;
    if(!Email || !Password){
        return res.status(422).json({error:"Please filled the data properly"})
    }
    try{
        const userExist = await UserData.findOne({Email:Email});
        console.log(userExist)
        if(userExist){
            return res.status(422).json({error:"Email already Exist"})
        }else{
            const user =new UserData({Email,Password})
            // password Hash before going to save;
            await user.save();
            res.status(201).json({message:"User registerd successfully"})
        }
    }catch(e){
     console.log(e)
    }
})
router.post("/login",async(req,res)=>{
    try{
    const {Email,Password} = req.body
    if(!Email || !Password){
        return res.status(400).json({error:"plz filled the data"})
    }
    const userLogin =await UserData.findOne({Email:Email})
    if(userLogin){
    const isMatch = await bcrypt.compare(Password,userLogin.Password)
    const token =await userLogin.generateToken()
    console.log(token)
    if(!isMatch){
        res.status(400).json({error:"Invallid user want to login"})
    }else{
        res.json({message:"user Sign-In  Successfully"})
    }
    }else{
     res.status(400).json({error:"Invalid User"})
    }   
    }catch(e){
    console.log(e)
    }
})

module.exports = router