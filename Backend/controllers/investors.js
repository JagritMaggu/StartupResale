const {User} = require("../models/User.js");


const getAllinvestors = async(req,res)=>{
    try {
        if(req.user.role!=="founder"){
             return res.status(403).json({ message: "Unauthorized from server" });
        }
        const investors = await User.find({ role: "investor" }).select("_id name email")
        res.json(investors)
    } catch (error) {
       res.status(500).json(error.message)
    }
}

module.exports={getAllinvestors}