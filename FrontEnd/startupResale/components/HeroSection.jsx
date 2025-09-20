import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LogIn, PlusCircle } from 'lucide-react';

function HeroSection() {
  const navigate = useNavigate();
  useEffect(()=>{
      document.body.style.overflow = "hidden";
      return ()=>{
        document.body.style.overflow = "auto"
      }
  },[])
  const bgStyle = {
      background: `url("/images/corporateSetupHero2.jpg") no-repeat center center fixed `,
      backgroundSize: "100% 100%",
     minHeight: "100vh",
     height:"100vh",
  position:"absolute",
    filter:"blur(8px)",
        transform:"scale(1.05)",
   width:"100%",
     
    
      margin: "0px",
    padding:"0px"};

function navigateToSignup(){
navigate("/signup")
}
function navigateToLogin(){
navigate("/login")
}

  return (

<>
   

   <div className='flex justify-center items-center h-screen'>
         <div style={bgStyle} ></div>
         <div className='z-10 flex justify-center items-center' >
        <img src="/images/Founderhub3.png" className='h-100 w-100' />  
     <div className='grid grid-row-2 gap-3'>
      <button
            onClick={()=>navigateToSignup()}
            className="flex items-center justify-center mx-2 text-white transition duration-300 bg-black px-3 py-3.5 rounded-lg  hover:bg-gray-900 active:bg-blue-600"
          >
            <PlusCircle className="text-gray-400 mr-2 h-5 w-5" /> Signup
          </button>
        
        <button className="text-white flex items-center mx-2 justify-center transitiion duration-300 bg-black  px-3 py-3.5 border-0 rounded-lg   hover:bg-gray-900  active:bg-blue-600" 
        onClick={()=>navigateToLogin()}><LogIn className="text-gray-400 mr-2 h-5 w-5"/>Login</button>
        </div>
      </div>  
</div>
    </>
  )
}


export default HeroSection