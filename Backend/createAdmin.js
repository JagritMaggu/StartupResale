const mongoose = require("mongoose");

require("dotenv").config();

const {User} = require("./models/User.js");

async function createAdmin(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(process.env.MONGO_URI)
        const password = process.env.ADMIN_PASSWORD;
        const email = process.env.ADMIN_EMAIL;
        const name = process.env.ADMIN_NAME;
        const phone = process.env.ADMIN_PHONE;
       
        const admin = await User.create({
            name,
            email,
            phone,
            password,
            role:"admin"
        });
    } catch (error) {
        console.log("Error: ",error.message)
    } finally{
        await mongoose.disconnect();
    }
}

createAdmin();