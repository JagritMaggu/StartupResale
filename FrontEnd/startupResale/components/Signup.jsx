import React from "react";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import api from "../utils/api.js"; 
import { transform } from "framer-motion";
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Briefcase,  UserPlus, PlusCircle } from "lucide-react";
export default function SignupForm(){

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [companyName, setCompanyName] = useState("")
    const [role, setRole] = useState("")
    const  bgStyle = {
         background: `url("/images/sereneoffice.jpg") no-repeat center center fixed `,
         backgroundSize: "100% 100%",
         position:"absolute",
         transform:"scale(1.05)",
        minHeight: "100vh",
        height:"100vh",
     filter:"blur(8px)",
      width:"100%",
       
       
         margin: "0px",
       padding:"0px"};
const divStyle ={
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
       margin: "0px",
    padding:"0px",
      position:"absolute",
    }
    const navigate = useNavigate()

    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
        const res= await api.post("/signup",{
                name,
                email,
                phone,
                password,
                companyName,
                role
            });
            console.log(res.data)
          if(res.data.message ==="Registered Successfully" && res.data.user.role ==="founder" ){
                
                navigate("/Homepage")
            }if(res.data.message ==="Registered Successfully" && res.data.user.role ==="investor" ){
              
              navigate("/InvestorPortal")
            }
                    
        setName("")
        setEmail("")
        setPhone("")
        setPassword("")
        setCompanyName("")
        setRole("")
          
              
   
        }
        
        catch(error){
          alert("Something went wrong!, Please try again");
        }
    };

   return (

     
        <div className='relative  min-h-screen w-full flex items-center justify-center overflow-hidden'>

          <div style={bgStyle}> </div>
        <motion.div
        className="relative z-10 bg-gray-200 p-8 mx-auto rounded shadow-md w-full max-w-4xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl flex justify-center items-center text-gray-800  font-bold text-center mb-6">Signup Form{" "}<PlusCircle className="text-gray-500 ml-2 mt-1.5 h-5 w-5" /></h2>
        <form onSubmit={handleLogin} className="space-y-6">

          <div className="grid grid-cols-3  gap-4">

            <div className="flex items-center border rounded px-3 py-2">
              <User className="text-gray-500 mr-2 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                required
                className="text-gray-700  focus:outline-none p-2 w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <Mail className="text-gray-500 mr-2 h-5 w-5" />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                required
                className="text-gray-700  focus:outline-none p-2 w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <Lock className="text-gray-500 mr-2 h-5 w-5" />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                required
                className="text-gray-700   focus:outline-none p-2 w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            </div>
            <div className="grid grid-cols-3  gap-4">
            <div className="flex items-center border rounded px-3 py-2">
              <Phone className="text-gray-500 mr-2 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={phone}
                required
                className="text-gray-700   focus:outline-none p-2 w-full"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <Briefcase className="text-gray-500 mr-2 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter Company Name"
                value={companyName}
                required
                className="text-gray-700  focus:outline-none p-2 w-full"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="flex items-center border rounded px-3 py-2">
              <select
                value={role}
                required
                className="text-gray-500 focus:outline-none p-2 w-full"
                onChange={(e) => setRole(e.target.value)}
              >
               
                <option  className="text-gray-700  focus:outline-none p-2 w-full" value="">Select Role</option>
                <option  className="text-gray-700 focus:outline-none p-2 w-full" value="founder">Founder</option>
                <option  className="text-gray-700  focus:outline-none p-2 w-full" value="investor">Investor</option>
              </select>
            </div>

          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-full text-white transition duration-300 bg-black py-5 rounded-lg hover:bg-gray-900  active:bg-blue-600"
          >
            <UserPlus className="text-gray-400 mr-2 h-5 w-5" /> Signup
          </button>

        </form>

        <p className="text-center mt-6 text-black text-lg">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-600 transitiion duration-700 hover:underline">
            Click Here
          </Link>
        </p>
      </motion.div>
        </div>
     
    )

}