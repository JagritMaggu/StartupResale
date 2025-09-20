const mongoose = require("mongoose");
const { Schema, model } = mongoose; 
const {User} = require("../models/User.js");
const chatSchema = new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId, ref:"User", required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId, ref:"User", required:true
    },

   isRead:{type:Boolean, default:false},
     fileUrl: { type: String }, 
  fileType: { type: String },

    message:{type:String, required:true}
},
{timestamps: true});


const Chat = model("Chat", chatSchema)

module.exports = {Chat};