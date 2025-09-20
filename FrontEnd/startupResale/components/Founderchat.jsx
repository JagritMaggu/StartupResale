// this page is to chat with the founder through investor portal


import React from 'react'
import { useEffect, useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom'
import api from "../utils/api.js"
import { io } from 'socket.io-client'
import {toast} from 'react-hot-toast'
import axios from 'axios';
import { motion } from 'framer-motion'
import {Send, MessageCircleDashed, BadgeHelp, Paperclip} from "lucide-react"

let socket;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_CLOUD_UPLOAD_PRESET;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

function Founderchat() {
  const  bgStyle = {
      background: `url("/images/founderchatdark2.jpg") no-repeat center center fixed `,
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
    const { founderId, investorId } = useParams();
    
      const selectedFounderId = founderId;
      const selectedInvestorid = investorId
    useEffect(()=>{ 
      async function Chat() {
        try {
                 const userRes = await api.get("/fetchUser")
                   const fetchedUser = userRes.data;
                 if( !fetchedUser || fetchedUser.role === "admin"){
              // userRes.data here = (req.user) sent by the backend. however if in the backend it was res.json({user:req.user}) then we would have written userRes.data(<the whole obj>).user.role here
              toast.error("Unauthorised");
              navigate("/")
              return;
            }
               
                 setUser(fetchedUser)  
          const otherUserId = fetchedUser.role === "founder"? selectedInvestorid:selectedFounderId;
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
    
      message: data.message,
      createdAt: new Date().toISOString(),
      fileUrl: data.fileUrl || null, 
      fileType: data.fileType || null
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
  


    const sendMessage = (e)=>{
    e.preventDefault()
    if (!message.trim() || !user) return

    let to = null
    if (user.role === "founder") {
      to = selectedInvestorid
    } else if (user.role === "investor") {
      to = selectedFounderId 
    }

    if (!to) return

    socket.emit("sendMessage",{to ,message, from:user._id, fromName:user.name, fileUrl:null, fileType:null});

setChat((prev) => [
    ...prev,
    {
      senderId: { _id: user._id, name: user.name }, 
      receiverId: { _id: to }, 
      message: message,
      fileUrl:null,
      fileType:null,
      createdAt: new Date().toISOString(),
    },
  ]);
    setMessage("")
  }


  const handleFileUpload = async(file)=>{
   if(!file) return;
   try {
       const formData = new FormData();
   formData.append("file", file);
   formData.append("upload_preset", uploadPreset)
   formData.append("cloud_name",cloudName)

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      formData
    );

    return response.data.secure_url;
   } catch (error) {
     console.error("File upload failed:", error);
    throw new Error("Failed to upload file");
   }

  }


  const sendFile = async(file)=>{
    if(!file|| !user) return;
     let to = null;
  if (user.role === "founder") {
    to = selectedInvestorid;
  } else if (user.role === "investor") {
    to = selectedFounderId;
  }
  if (!to) return;
try {
  const fileUrl = await handleFileUpload(file)
  socket.emit("sendMessage",{
    to,
    message:"",
    from:user._id, 

    fromName:user.name,
    fileUrl,
    fileType: file.type,

  })
  setChat((prev)=>[...prev,{
     senderId: { _id: user._id, name: user.name }, 
      receiverId: { _id: to }, 
      message: '',
      createdAt: new Date().toISOString(),
      fileUrl:fileUrl,
      fileType:file.type
  }])
} catch (error) {
    console.error(err);
    toast.error("File upload failed!");
}
  }
  return (
    <div className='max-h-screen max-w-screen'>
      <div style={bgStyle}></div>
      <div  className='relative z-10 flex flex-col h-screen'>
   <motion.h2 initial={{ opacity:0,y:-15}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5}} className="text-2xl flex font-bold justify-center items-center mt-4 mb-5.5 text-gray-300">
              <MessageCircleDashed className="text-gray-300 mr-2 mt-1 h-6 w-6" />My Chat</motion.h2>

     <div className='flex-1 relative text-2xl max-h-[70vh] bg-black/7 text-amber-100 rounded-lg max-w-full overflow-y-auto  p-2 m-10'>
  {chat.map((msg, i) => (
    <motion.div initial={{ opacity:0,x:-10}}
          animate={{opacity:1,x:0}}
          transition={{duration:0.5}} key={i} className={`mb-2 ${msg.senderId._id === user._id ? "text-gray-100 text-right mx-3" : "text-orange-300 mx-3"}`}>
      <strong>{msg.senderId.name}:</strong><br/>
      
      {msg.message && <span>{msg.message}</span>}
<div
    className={`flex mt-3 ${
      msg.senderId._id === user._id ? "justify-end" : "justify-start"
    }`}
  >
      {msg.fileUrl && (
        msg.fileType.startsWith('image/') ? (
          <a
        href={msg.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
          <img src={msg.fileUrl} alt="uploaded" className="max-w-[400px] rounded-lg shadow-md" />
          </a>
        ) : (
          <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            📎 View File
          </a>
        )
      )}
      </div>
<input
  type="file"
  id="file-upload"
  style={{ display: 'none' }}
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) sendFile(file);
  }}
/>
    </motion.div>
  ))}

 

      </div>
      <div className='flex items-center  mb-10 mx-12 my-auto max-w-full'>
     

      <form onSubmit={sendMessage} className='flex   max-h-screen w-full'>
        <input type="text"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        className='text-md p-1.5 border rounded-md text-gray-200 w-full mr-3' />
         
         <label htmlFor="file-upload" className="cursor-pointer mx-1.5 flex items-center">
  <Paperclip className="text-gray-200 mr-2 mt-1 h-6 w-6" />
</label>
        <button
          type="submit"
          className="flex items-center justify-center ml-1 pr-3 text-white transition duration-300 bg-indigo-900 p-1.5 rounded-lg hover:bg-indigo-950"
     
        >
           <Send className="text-gray-400 mr-2 mt-1 h-6 w-6" />
          Send
        </button>
      </form>
      </div>
      {/* this is for sending and uploading */}
    </div>
    </div>
  )
}

export default Founderchat
