import React from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../utils/api.js";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";
import {
  User,
  Mail,
  Factory,
  FileText,
  Hash,
  BarChart2,
  Tag,
  Edit,
  X,
  Check,
  Trash,
  Clipboard,
  Coins,
  MessageCircle
} from "lucide-react";
import {motion} from "framer-motion"
function InvestorPortal() {
  const [startups, setStartups] = useState([]);
const [user,setUser] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchAllStartups() {
      try {
        const userRes = await api.get("/fetchUser");
        const fetchedUser = userRes.data
        setUser(fetchedUser)
      
      
        if (userRes.data.role !== "investor") {
          // userRes.data here = (req.user) sent by the backend. however if in the backend it was res.json({user:req.user}) then we would have written userRes.data(<the whole obj>).user.role here
          toast.error("Unauthorised");
          navigate("/");
          return;
        }
        const res = await api.get("/startups/allStartups");
        // if(res.data.message==="Not authenticated"){
        //   toast.error("Unauthorised")
        //   navigate("/")
        // }
        // if(res.data.error==="Unauthorised"){
        //   toast.error("Unauthorised")
        //   navigate("/")
        // }
        setStartups(res.data);
        toast.success("Fetched All Startups");
      } catch (error) {
        console.log(error.message);
        toast.error("Sorry something went wrong!");
        navigate("/");
      }
    }

    fetchAllStartups();
  }, []);

  async function handleLogout() {
    try {
      const res = await api.post("/logout");

      if (res.data.message === "Logged out") {
        navigate("/");
        toast.success("Logged Out Successfully!");
      }
    } catch (error) {
      toast.error("Logout unsuccessful", error.message);
    }
  }

    const handleChat = (founderId) => {
      const investorid = user._id
    navigate(`/founderchat/${founderId}/${investorid}`);
  };

  return (
    <div className="bg-gray-800 p-8 min-h-screen  rounded shadow-md w-full "> 
     
       <div className="flex m-0">
      <h1 className="text-3xl mx-3 my-2 text-white font-bold">All Startups:</h1>
      <button
        onClick={handleLogout}
        className="text-white transitiion duration-300 ml-auto bg-red-700 px-3 py-3 mx-3 my-2  border-0 rounded-lg hover:bg-gradient-to-r  hover:bg-red-600   active:bg-blue-600"
      >
        Logout
      </button></div>
   
      {startups.length === 0 ? (
        <p className="text-gray-200 text-2xl">No startups found</p>
      ) : (
        <div className="grid m-3 grid-cols-1 gap-4">
          {startups.map((s) => (
            <motion.div  className="bg-gray-200 z-10 p-8 rounded shadow-md w-full max-w-8xl"
          initial={{ opacity:0 ,  x:-50}}
          animate={{opacity:1, x:0}}
          transition={{duration:0.6}}  >
            <div key={s._id}>
            <h2 className="text-3xl text-emerald-800 m-3.5 flex items-center font-bold"><Tag className="text-gray-400 mr-2 h-5 w-5" /><p>{s.name}</p></h2>
               <p className="text-2xl flex items-center m-3.5  text-gray-500"><User className="text-gray-400 mr-2 h-5 w-5" /><strong >Founder Name:{" "}</strong> <p className="ml-1">{s.ownerId.name}</p></p>
               <p className="text-2xl flex items-center m-3.5 text-gray-500"><Mail className="text-gray-400 mr-2 h-5 w-5" /><strong >Founder email:{" "}</strong> {" "}<p className="ml-1">{s.ownerId.email}</p></p>
               <p className="text-2xl flex items-center m-3.5 text-gray-500"><Factory className="text-gray-400 mr-2 h-5 w-5" /><strong >Industry:{" "}</strong>{" "} <p className="ml-1">{s.industry}</p></p>
               <p className="text-2xl flex items-center m-3.5 text-gray-500"><BarChart2 className="text-gray-400 mr-2 h-5 w-5" /><strong >Stage:{" "}</strong> {" "}<p className="ml-1">{s.stage}</p></p>
        
              <p className="text-2xl flex items-center m-3.5 text-gray-500"><FileText className="text-gray-400 mr-2 h-5 w-5" /><strong >Description:{" "}</strong> {" "}<p className="ml-1">{s.description}</p></p>
             
              <h2 className="text-2xl flex items-center m-3.5 text-gray-500"><Coins className="text-gray-400 mr-2 h-5 w-5" /><strong >Valuation:{" "}</strong> {" "}<p className="ml-1">{s.valuation}</p></h2>
                <div className="flex justify-end">
                  <button  className="flex items-center justify-center ml-2 text-white transition duration-300 bg-blue-950 p-3 rounded-lg hover:opacity-90" onClick={()=>{handleChat(s.ownerId._id)} }> <MessageCircle className="text-gray-400 mr-2 h-5 w-5" />Chat with founder</button>
                  </div>
              {/* Button for investor to contact */}
           
            </div>
            </motion.div>
          ))}
       </div>
      )}
     </div>
  );
}

export default InvestorPortal;
