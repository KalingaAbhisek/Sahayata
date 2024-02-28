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
    <div>
    <button onClick={handleSignOut}>
      SignOut
    </button>
    </div>
  )
}

export default SignOut