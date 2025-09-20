const {verifyToken} = require("../utils/util.js") 
const {User} = require("../models/User.js") 
const checkAuth = async(req, res, next)=>{ 
    const token =req.cookies?.jwt; 
    if(!token){ return res.status(401).json({message:"Not authenticated"}) } 

    const decoded = verifyToken(token); 

    if(!decoded){ return res.status(401).json({message:"Not authenticated"}) } 
    req.user= await User.findById(decoded.id).select("-password"); 
    // the id used in decoded.id here is named as it was signed using jwt.sign 
    next(); 
    }; 
    module.exports = checkAuth