const mongoose = require('mongoose');
const { Schema } = mongoose

const searchSchema = new Schema({
    userId:{type:Schema.Types.ObjectId,ref:'UserData'},
    id:{type:Number,required:true,unique:true},
    title: { type: String,required:true},
    description: { type: String,required:true}
})

const search = mongoose.model('search',searchSchema)

module.exports =search;