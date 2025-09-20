// this will go in startupvaluation page (main page)

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import {  HelpCircle,  BriefcaseBusinessIcon, Activity, MessageCircle, Clipboard,LogOut } from "lucide-react";
import{useEffect,useState} from "react"
import toast from "react-hot-toast";
function Navbar() {
   const [user,setUser] = useState(null)
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
            }}
            catch(error){
              console.log(error.message);
      toast.error("Sorry something went wrong!")
      navigate("/")
      return
            }}  
          
          Chat();
          },[])
  const admin = import.meta.env.VITE_ADMIN_ID
  const buttonStyle = {
    background: "linear-gradient(100deg, #33a810ff, #0fa0ccff)",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "10px",
    color: "white",
    marginLeft: "10px",
  };
  const divStyle = {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "beige",
    gap: "1rem",

    padding: "20px",
  };
 const navigate = useNavigate()
  async function handleLogout(){
  
      try {
        const res = await api.post("/logout")

        if(res.data.message ==="Logged out") {
          navigate("/")
          toast.success("Logged Out Successfully!")
        }
      } catch (error) {
        toast.error("Logout unsuccessful", error.message)
      }
   
  }


   const handleChat = (adminId) => {
      const founderId = user._id
    navigate(`/helpdesk/${founderId}/${adminId}`);
  };
 function registerStartup(){
  navigate('/RegisterStartup')
 }
 function startupValuation(){
  navigate('/StartupValuation')
 }
 function myStartups(){
  navigate('/Mystartups')
 }
 function investorList(){
  navigate('/investorList')
 }
  return (
    <nav className="sticky top-0 z-50 bg-transparent h-36 px-7 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
       <img src="/images/Flogo.png" className="h-11 w-12"/> 
        <span className="text-xl font-bold text-white">Founderhub</span>
      </div>
      <div className="hidden md:flex space-x-6">
       {/* <button
              className="ml-2 bg-green-500 px-2 py-1 rounded"
              onClick={() => handleChat(admin)}
            >
              Chat
            </button> */}
        <button
              className="text-white flex items-center mx-2 justify-center transitiion duration-300 bg-black  px-3 py-3.5 border-0 rounded-lg   hover:bg-blue-900"
              onClick={() => handleChat(admin)}
            >
              <HelpCircle className="text-gray-400 mr-2 h-5 w-5"/>
              HelpDesk
            </button>
         <button className="text-white flex items-center mx-2 justify-center transitiion duration-300 bg-black  px-3 py-3.5 border-0 rounded-lg   hover:bg-gray-900" 
        onClick={registerStartup}><Clipboard className="text-gray-400 mr-2 h-5 w-5"/>Register Startup</button>
         <button className="text-white flex items-center mx-2 justify-center transitiion duration-300 bg-black  px-3 py-3.5 border-0 rounded-lg   hover:bg-gray-900" 
        onClick={startupValuation}><Activity className="text-gray-400 mr-2 h-5 w-5"/>Startup Valuation</button>
         <button className="text-white flex items-center mx-2 justify-center transitiion duration-300 bg-black  px-3 py-3.5 border-0 rounded-lg   hover:bg-gray-900" 
        onClick={myStartups}><BriefcaseBusinessIcon className="text-gray-400 mr-2 h-5 w-5"/>My Startups</button>
        <button className="text-white flex items-center mx-2 justify-center transitiion duration-300 bg-black  px-3 py-3.5 border-0 rounded-lg   hover:bg-gray-900" 
        onClick={investorList}><MessageCircle className="text-gray-400 mr-2 h-5 w-5"/>Chat with investors</button>
        <button onClick={handleLogout}  className="text-white flex items-center mx-2 justify-center transitiion duration-300 bg-red-800  px-3 py-3.5 border-0 rounded-lg   hover:bg-red-900 hover:border-none "><LogOut className="text-gray-400 mr-2 h-5 w-5"/>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
