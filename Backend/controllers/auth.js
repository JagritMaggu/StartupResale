const {User} = require("../models/User.js");
const { generateToken } = require("../utils/util.js");

const signup = async (req, res)=>{
    try{
        const {name, email, password, phone, companyName, role} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            });
        }
        const user = await User.create({name,email,password,phone,companyName, role});
               const token = generateToken(user)

             res.cookie("jwt", token ,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
               
                maxAge: 30* 24 * 60 *60 * 1000
             });

        res.status(201).json({ message:"Registered Successfully",
            user:{id:user._id, email: user.email, role:user.role, kycStatus:user.kycStatus}});
      
    }catch(error){
        console.log("Signup body:", req.body);
         console.error("Signup error:", error);
        res.status(404).json({message:error.message});
    }
};

const login = async (req, res)=>{
    try {
        const {email, password}= req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }
         const isMatch = await user.matchPassword(password);
         if(!isMatch) return res.status(404).json({message:"Invalid email or password"});

            const token = generateToken(user)
            // the user found above through the db query

           res.cookie("jwt", token ,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite:"strict",
                maxage: 30* 24 * 60 *60 * 1000
             })

         res.status(201).json({
            message:"Login successful",
                user:{id:user._id, email: user.email, role:user.role, kycStatus:user.kycStatus}
         })
    } catch (error) {
        res.status(400).json({message:error.message});
        
    }
}

const logout = async(req,res)=>{
    res.clearCookie("jwt");
    res.json({ message:"Logged out"})
}

module.exports = { signup, login, logout }