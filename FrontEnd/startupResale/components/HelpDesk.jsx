import React from 'react'
import { useState, useEffect } from 'react'
import api from "../utils/api.js"
import { io } from 'socket.io-client'
import {toast} from 'react-hot-toast'
import { motion } from 'framer-motion'
import {Send, HelpingHand, BadgeHelp, HelpCircle} from "lucide-react"
import { useNavigate,useParams } from 'react-router-dom'

  let socket = null;

function HelpDesk() {
 const  bgStyle = {
      background: `url("/images/helpwall.jpg") no-repeat center center fixed `,
      backgroundSize: "100% 100%",
      position:"fixed",
      
     minHeight: "100vh",
     height:"100vh",
  filter:"blur(8px)",
   width:"100%",
    
    
      margin: "0px",
    padding:"0px"};
  const [message,setMessage] = useState("")
  const [chat,setChat] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
   const { founderId , adminId} = useParams();
  const selectedFounderId = founderId;

 let admin = import.meta.env.VITE_ADMIN_ID
  const AdminId = admin
  useEffect(()=>{ 
    async function Chat() {
      try {
               const userRes = await api.get("/fetchUser")
               const fetchedUser = userRes.data;
               setUser(fetchedUser)
          if( !userRes.data || userRes.data.role ==="investor"){
            // userRes.data here = (req.user) sent by the backend. however if in the backend it was res.json({user:req.user}) then we would have written userRes.data(<the whole obj>).user.role here
            toast.error("Unauthorised");
            navigate("/")
            return;
          }
           const otherUserId = fetchedUser.role === "founder"? admin:selectedFounderId;
          const previousChatRes = await api.get(`/chats/${otherUserId}`)
          const previousChats = previousChatRes.data
          setChat(previousChats)
               
    socket = io("http://localhost:8001", {
      withCredentials:true,
    });

 
    
    socket.on("recieveMessage", (data) =>{
      // the obj is sent from the backend here in the data arg (check server.js)
      setChat((prev) => [
    ...prev,
    {
     senderId: { _id: data.from, name: data.fromName },  // Normalized
      receiverId: { _id: fetchedUser._id, name: fetchedUser.name }, 
      senderName: data.fromName || "Unknown", // fallback in case fromName is missing
      senderIsMe: String(data.from) === String(fetchedUser._id),
      message: data.message,
      createdAt: new Date().toISOString(),
    },
  ]);
}); 
    
    return ()=>{socket.disconnect();} ;
      } catch (error) {
        console.log(error.message);
      toast.error("Sorry something went wrong!")
      navigate("/")
      return
      }
     
    }
    Chat();
  },[]);
console.log(chat);
  const sendMessage = (e)=>{
    e.preventDefault()
    if (!message.trim() || !user) return

    let to = null
    if (user.role === "founder") {
      to = admin
    } else if (user.role === "admin") {
      to = selectedFounderId 
    }

    if (!to) return

    socket.emit("sendMessage",{to:to ,message:message, from:user._id, fromName:user.name});

   setChat((prev) => [
    ...prev,
    {
      senderId: { _id: user._id, name: user.name }, 
      receiverId: { _id: to }, 
      message: message,
      createdAt: new Date().toISOString(),
    },
  ]);
    setMessage("")
  }
  return (
    //  className='flex flex-col items-center min-h-screen max-w-screen bg-gray-100'
    <div className='max-h-screen max-w-screen'>
    <div style={bgStyle}></div>
    
    <div className='relative z-10 flex flex-col h-screen'>
        <motion.h2 initial={{ opacity:0,y:-15}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.5}} className="text-2xl flex font-bold justify-center items-center mt-4 mb-5.5 text-gray-300"><BadgeHelp className="text-gray-400 mr-2 mt-1 h-6 w-6" />Helpdesk Chat</motion.h2>
      <div className='flex-1 relative text-2xl max-h-[70vh] bg-black/15 text-amber-100 rounded-lg max-w-full overflow-y-auto  p-2 m-10'
      >
       {chat.map((msg, i) => (
        <motion.div  initial={{ opacity:0,x:-10}}
          animate={{opacity:1,x:0}}
          transition={{duration:0.5}}>
  <p key={i}
     className={`mb-1 ${msg.senderId?._id === user._id ? "text-gray-100 text-right mx-4" : "text-orange-300 mx-4"}`}>
    <strong>{msg.senderId?.name}:</strong> {msg.message}
  </p>
  </motion.div>
))}
      </div>
      <div className='flex items-center  mb-10 mx-12 my-auto max-w-full'>
      <form onSubmit={sendMessage} className='flex items-end justify-end max-h-screen w-full'>
        <input type="text"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        className='text-md p-1.5 border rounded-md text-gray-200 w-full mr-3' />
        <button
          type="submit"
          className="flex items-center justify-center ml-1 pr-3 text-white transition duration-300 bg-indigo-900 p-1.5 rounded-lg hover:bg-indigo-950"
     
        >
            <Send className="text-gray-400 mr-2 mt-1 h-6 w-6" />
          Send
        </button>
      </form>
      </div>
      </div>
    </div>
  )
}

export default HelpDesk
