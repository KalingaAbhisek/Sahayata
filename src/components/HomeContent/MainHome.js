import React from 'react'
import { auth } from '../../firebase'
import {useNavigate} from 'react-router-dom'

const MainHome = () => {
  const navigate = useNavigate();
  const handleSignOut = ()=>{
    localStorage.removeItem("email");
    auth.signOut()
  }

  const handleClick = () => {
    // Navigate to the '/home' route
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