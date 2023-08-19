import React from 'react'
import {auth, provider} from "../firbaseconfig/index"
import { signInWithPopup } from "firebase/auth"
import Cookie from 'universal-cookie'

const cookies = new Cookie()

export default function Login({ setIsloggedin }) {
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsloggedin(true);

        } catch (err) {
            console.error(err);
          }
    }
  return (
    <div className='auth-container mt-5 ' >
        <div className="d-flex justify-content-center " style={{alignItems:"center"}}>
            <div className="form">
                <p id="heading">Login</p>
                <div className="field">
                <lord-icon
                    src="https://cdn.lordicon.com/jyijxczt.json"
                    trigger="loop"
                    delay = "0"
                    colors="primary:#3a3347,secondary:#ffc738,tertiary:#ebe6ef,quaternary:#646e78"
                    style={{"width":"200px","height":"200px"}}>
                </lord-icon>

                </div>
                <div className="btn">
               
                <button type='submit'  className="button2"  onClick={signInWithGoogle} >Login & Sign Up</button>
                </div>
                <button className="button3">Forgot Password</button>
                
            </div>
        </div>
       
    </div>
    
  )
}
