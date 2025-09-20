const {User} = require("../models/User.js");


const getAllfounders = async(req,res)=>{
    try {
        if(req.user.role!=="admin" && req.user.role!=="investor"){
             return res.status(403).json({ message: "Unauthorized from server" });
        }
        const founders = await User.find({ role: "founder" }).select("_id name email")
        res.json(founders)
    } catch (error) {
       res.status(500).json(error.message)
    }
}

module.exports={getAllfounders}