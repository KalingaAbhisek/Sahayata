import React from 'react'
import { auth } from '../../firebase'

const MainHome = () => {
  const handleSignOut = ()=>{
    localStorage.removeItem("email");
    auth.signOut()
  }
  return (
    <div>
      <button onClick={handleSignOut}>
        SignOut
      </button>
    </div>
  )
}

export default MainHome