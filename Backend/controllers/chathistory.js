const { Chat } = require("../models/ChatSchema");
const {User} = require("../models/User.js");

const previousChats = async(req,res)=>{
    try {
    const myId = req.user._id;
    const otherId = req.params.id;


    const chats = await Chat.find({
      $or: [
        { senderId: myId, receiverId: otherId },
        { senderId: otherId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 }).populate("senderId", "name _id email")     
    .populate("receiverId", "name _id email");;
console.log('myId:', req.user._id);
console.log('otherId:', req.params.id);


    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err)
  }

}


module.exports = {previousChats}