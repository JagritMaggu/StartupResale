const jwt =require("jsonwebtoken");


// this is the mongo _id. it will be used when we will call this function
const generateToken = (user)=>{
    return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET);
};


const verifyToken = (token)=>{
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(error){
        return null;
    }
};

module.exports = {generateToken, verifyToken};