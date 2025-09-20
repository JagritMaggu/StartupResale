import React from "react";
import api from "../utils/api.js";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AdminPortal = () => {
  
  const admin = import.meta.env.VITE_ADMIN_ID
  const navigate = useNavigate();
    const [founder, setFounder] = useState([]);
  useEffect(() => {
    async function Chat() {
      try {
        const userRes = await api.get("/fetchUser");
        
       
        if (!userRes|| userRes.data.role !== "admin") {
          // userRes.data here = (req.user) sent by the backend. however if in the backend it was res.json({user:req.user}) then we would have written userRes.data(<the whole obj>).user.role here
          toast.error("Unauthorised");
          navigate("/");
          return;
        }
        const foundersRes = await api.get("/founders")
        const founders = foundersRes.data
        
        setFounder(founders)
      } catch (error) {
        console.log(error)
        toast.error("Unauthorised");
        navigate("/");
        return;
      }
    }
    Chat();
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
    const adminId = admin;
    navigate(`/helpdesk/${founderId}/${adminId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-blue-500 text-white rounded-lg shadow-lg"
    >
      <h1>Hi! from admin</h1>
      <button
        onClick={handleLogout}
        className="text-white transitiion duration-300 bg-gradient-to-r from-gray-700 to-black px-3 py-3 border-0 rounded-lg hover:bg-gradient-to-r  hover:from-orange-600 hover:to-pink-700 hover:px-4 hover:py-4 active:bg-blue-600"
      >
        Logout
      </button>
       <h2 className="mt-6 font-bold">Founders List</h2>
      <ul>
        {founder.map((founder) => (
          <li key={founder._id} className="my-2">
            {founder.name} {founder.email} {" "}
            <button
              className="ml-2 bg-green-500 px-2 py-1 rounded"
              onClick={() => handleChat(founder._id)}
            >
              Chat
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AdminPortal;
