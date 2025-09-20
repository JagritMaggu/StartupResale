import React from 'react'
import api from "../utils/api.js"
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import {MessageCircle, User} from "lucide-react"
function ChatWithInvestorList() {
    const navigate = useNavigate()
    const [user,setUser] = useState(null)
    const [investors, setInvestors] = useState([])
    const bgStyle = {
        background: `url("/images/officeSetupWithDim.jpg") no-repeat center center fixed `,
        backgroundSize: "100% 100%",
        filter:"blur(5px)",
        transform:"scale(1.01)",
        position: "fixed",
      
        margin: "0px",
        padding: "0px",
      };
    useEffect(()=>{
        async function fetchInvestors(){
            try {
                 const userRes = await api.get("/fetchUser");
                 const fetchedUser = userRes.data;
                 setUser(fetchedUser);
                 const investorsRes = await api.get("/investors")
                 const fetchedInvestors = investorsRes.data
                 console.log(fetchedInvestors)
                 setInvestors(fetchedInvestors)
                 if(!fetchedUser && fetchedUser.role!=="founder"){
                     toast.error("Unauthorised");
                                navigate("/")
                                return;
                 }
            } catch (error) {
                 console.log(error.message);
                      toast.error("Sorry something went wrong!")
                      navigate("/")
                      return
            }
        }
        fetchInvestors();
    },[])



    const handleChat = (investorid) => {
        const founderId = user._id
    navigate(`/founderchat/${founderId}/${investorid}`);
  };
  return (
    <div className='bg-gray-700 bg-gradient-to-r from:bg-gray-700 to- relative min-h-screen min-w-screen overflow-hidden '>
      <div style={bgStyle} className='min-h-screen min-w-screen'></div>
    <motion.div className="relative text-white z-10 p-8 mx-auto w-screen"
          initial={{ opacity:0 ,  x:-50}}
          animate={{opacity:1, x:0}}
          transition={{duration:0.7}}>
     {investors.map((investor) => (
      
          <li key={investor._id} className="my-2 text-2xl flex items-center">
             <User className="text-gray-400 mr-2 mt-1 h-6 w-6" />
            {investor.name} ({investor.email}) {" "}
            <button
                className="flex items-center justify-center ml-2 text-white transition duration-300 bg-blue-950 p-2 rounded-lg hover:opacity-85"
              onClick={() => handleChat(investor._id)}
            >
              <MessageCircle className="text-gray-400 mr-2 h-5 w-5" />
              Chat
            </button>
          </li>
     
        ))}
  
    </motion.div>
    </div>
  )
}

export default ChatWithInvestorList
