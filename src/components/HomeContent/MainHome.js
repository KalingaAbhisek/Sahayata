import React from 'react'
import { auth } from '../../firebase'
import {useNavigate} from 'react-router-dom'

const MainHome = () => {
  const navigate = useNavigate();
  const handleSignOut = async ()=>{
    try{
      localStorage.removeItem("email");
      await auth.signOut();
    }
    catch(error){
      console.error('Sign-Out failed:', error);
    }

  }

  const handleClick = () => {
    navigate('/contests');
  };
  return (
    <div>
      <div>
      <button onClick={handleSignOut}>
        SignOut
      </button>
      </div>
      <div>
      <button onClick={handleClick}>
        Coding Contest Calender
      </button>
      </div>
    </div>
  )
}

export default MainHome