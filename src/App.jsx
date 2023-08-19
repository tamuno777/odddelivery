import { useState, useRef } from 'react'
import Cookies from 'universal-cookie'
import { Link, useLocation } from "react-router-dom";
import './App.css'
import Login from './auth/login'

import Mainhome from './mainapp/mainhome';
import Nav from './components/Nav';
import Routers from './Router';


const cookies = new Cookies()

function App() {
  const [isLogedin,setIsloggedin] = useState(cookies.get("auth-token"))
  const location = useLocation();
  

 
  if (!isLogedin){
    return (
      <>
        
          <Login setIsloggedin={setIsloggedin}/>
        
      </>
    )
  }

  return (
    <>
    {/* <Nav/> */}
    {/* <Mainhome/> */}
    <Routers setIsloggedin={setIsloggedin}/>
     
     
       

   

    </>
  )
}

export default App
