const {User} = require("../models/User.js");



async function fetchUser(req,res) {
    try {
   
        res.json(req.user);
// the res here will be fetched in data object (res.data) in axios in frontend however if the code was res.json({user:req.user}) here then it would have come in res.data.user in frontend

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports={fetchUser}