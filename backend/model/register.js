const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    Email:{type:String,required:true,unique:true},
    Password:{type:String,required:true},
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
UserSchema.methods.generateToken = async function(){
    try{
        const newtoken = jwt.sign({_id:this._id},"myproject");
        this.tokens=this.tokens.concat({token:newtoken})
        await this.save()
        return newtoken
    }catch(error){
        res.send(error)
    }
}
// for bcrypt password....
UserSchema.pre("save",async function(next){
    if(this.isModified("Password")){
    this.Password = await bcrypt.hash(this.Password,12);
    }
next()
})
// create collection name with the help of models
const UserData = new mongoose.model("UserData",UserSchema);
module.exports=UserData;