import React from 'react'
import { auth } from '../../firebase';
import {Navigate} from 'react-router-dom'

const SignOut = () => {
    const handleSignOut = async (e)=>{
        try{
          await auth.signOut();
          <Navigate to="/" />
          localStorage.clear()
        }
        catch(error){
          console.error('Sign-Out failed:', error);
        }
        e.stopPropagation();
    
      }
  return (
    <li><a onClick={(e)=>handleSignOut(e)} href="/">Logout</a></li>
  )
}

export default SignOut