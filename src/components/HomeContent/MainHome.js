import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { useNavigate} from 'react-router-dom'
import SignOut from '../Navigation/SignOut';

const MainHome = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate('/contests', { replace: true });
    e.stopPropagation();
  };
  const [user, setUser] = useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    })
  },[])
  if(!user){
    navigate('/', { replace: true })
  }
  if(!user){
    return null
  }
  return (
    <div>
      <p>Welcome, {auth.currentUser.displayName}</p>
      <SignOut />
      <div>
      <button onClick={handleClick}>
        Coding Contest Calender
      </button>
      </div>
    </div>
  )
}

export default MainHome