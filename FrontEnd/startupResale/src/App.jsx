import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import Navbar from '../components/HeroSection'
import SignupForm from '../components/Signup'
import LoginForm from '../components/Login'
import HeroSection from '../components/HeroSection'
import StartupValuation from '../components/StartupValuation'
import HelpDesk from '../components/HelpDesk'
import RegisterStartup from '../components/RegisterStartup'
import MyStartups from '../components/MyStartups'
import InvestorPortal from '../components/InvestorPortal'
import AdminPortal from '../components/AdminPortal'
import Founderchat from '../components/Founderchat'
import ChatWithInvestorList from '../components/ChatWithInvestorList'
import Aboutus from '../components/Aboutus'

function App() {
 

  return (
    <>
 <Routes>
 
  <Route path='/login' element={<LoginForm/>}/>
  <Route path='/signup' element={<SignupForm/>}/>
  <Route path='/' element={<HeroSection/>}/>
  <Route path='/StartupValuation' element={<StartupValuation/>}/>
  <Route path='/Homepage' element={<Aboutus/>}/>

  <Route path="/helpdesk/:founderId/:adminId" element={<HelpDesk />} />
  <Route path='/RegisterStartup' element={<RegisterStartup/>}/>
  <Route path='/MyStartups' element={<MyStartups/>}/>
  <Route path='/InvestorPortal' element={<InvestorPortal/>}/>
  <Route path='/admin' element={<AdminPortal/>}/>
  <Route path='/founderchat/:founderId/:investorId' element={<Founderchat/>}/>
 
  <Route path='/investorList' element={<ChatWithInvestorList/>}/>
 

 
  

 </Routes>
 <Toaster position='top-right' reverseOrder={false}/>
    </>
  )
}

export default App
