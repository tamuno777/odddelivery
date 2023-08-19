import React from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth';
import  { auth } from '../firbaseconfig/index';




export default function Nav({ setIsloggedin }) {
    const signuserout = async () => {
        await signOut(auth)
        cookies.remove("auth-token");
        setIsloggedin(false)
      }
    
  return (
    <div>
            <nav className='nav-container'>
                <Link to="home">
                <lord-icon
                    src="https://cdn.lordicon.com/jyijxczt.json"
                    trigger="loop"
                    delay = "0"
                    colors="primary:#3a3347,secondary:#ffc738,tertiary:#ebe6ef,quaternary:#646e78"
                    style={{"width":"100px","height":"100px"}}>
                </lord-icon>

                </Link>
                <ul>
                    <li>
                        <Link to="home">HOME</Link>
                    </li>
                    <li>
                        <Link to="Tracker">BOOK</Link>
                    </li>
                    <li>
                        <Link to="Contact">CONTACT</Link>
                    </li>
                    <li>
                        <Link to="home">PORTFOLIO</Link>
                    </li>
                    
                </ul>
                <li>
                        <Link onClick={signuserout}>LOG OUT</Link>
                </li>
            </nav>
    </div>
  )
}
