import React from "react";
import { Mail, Lock, ArrowRightCircle, LogIn  } from "lucide-react";
import {motion, transform} from 'framer-motion'
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import api from "../utils/api.js";
import toast from "react-hot-toast";

export default function LoginForm(){
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
 
    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
          const res = await api.post("/login",{
                email,
                password
            });
            if(res.data.message ==="Login successful" && res.data.user.role ==="founder" ){
                
                navigate("/Homepage")
            }
            if(res.data.message ==="Login successful" && res.data.user.role ==="investor"){
                
              navigate("/InvestorPortal")
            }
            if(res.data.message ==="Login successful" && res.data.user.role ==="admin"){
                
              navigate("/admin")
            }
         setEmail("")
         setPassword("")
         toast.success("Login successfull!")
        }
        
        catch(error){
            console.log(error)
          toast.error(`Login Error: ${error.message}`)
        }
    };

    return(
         <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
         <div  style={bgStyle}  >  </div>
          <motion.div
          className="bg-gray-200 z-10 p-8 mx-auto  rounded shadow-md w-full max-w-xl"
          initial={{ opacity:0 ,  y:-50}}
          animate={{opacity:1, y:0}}
          transition={{duration:0.6}}
          >
           <h2 className="text-2xl flex justify-center items-center text-gray-800  font-bold text-center mb-6">Login Form{" "}<LogIn className="text-gray-500 ml-2 mt-1.5 h-5 w-5" /></h2>
        <form onSubmit={handleLogin} className="space-y-3" >
          <div className="flex items-center border rounded px-3 py-2">
          <Mail className="text-gray-500 mr-2 h-12 w-12"/>
            <input 
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="text-gray-700 focus:outline-none p-2  w-full"
            required />
              <Lock className="text-gray-500 mr-2 h-12 w-12"/>
             <input 
              type="password"
              placeholder="Enter Password" 
              onChange={(e)=>{setPassword(e.target.value)}} 
              value={password}
                className="text-gray-700 focus:outline-none p-2 m-2 w-full "
              required/>
             
             </div>
             <button className="text-white flex items-center justify-center transitiion duration-300 bg-black  py-3.5 border-0 rounded-lg w-full   hover:bg-gray-900 " type="submit"><ArrowRightCircle className="text-gray-400 mr-2 h-5 w-5"/>Login</button>
        </form>
        
        <div className="mt-6 flex items-center justify-center">
            <p className="text-center text-black text-lg ">Don't have an account?{" "}
            <Link  className="text-yellow-600 transitiion duration-700 hover:underline " to="/signup">Click Here</Link>
             </p>
        </div>
        </motion.div>
        
  
    </div>
    )

}