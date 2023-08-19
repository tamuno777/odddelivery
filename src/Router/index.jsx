import { useState } from 'react'
import Login from '../auth/login';
// import Logout from './Logout/logout';
import { Route, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Mainhome from '../mainapp/mainhome';
import Nav from '../components/Nav';
import Tracker from '../mainapp/tracker';
import Contact from '../mainapp/contact';

function Routers({ setIsloggedin }) {
   
  const location = useLocation();


  return (
    <>
   <div className='master-body '>
       
          
          <Nav setIsloggedin={setIsloggedin}/>
          <Routes location={location}
                key={location.pathname}>
          <Route path="/" element={<Mainhome />} />
          <Route path="/home" element={<Mainhome />} />
          <Route path="/Tracker" element={<Tracker />} />
          <Route path="/Contact" element={<Contact />} />
          {/* <Route path="/Logout" element={<Logout />} /> */}
        </Routes>
        

   </div>
     
    
    </>
  )
}

export default Routers
