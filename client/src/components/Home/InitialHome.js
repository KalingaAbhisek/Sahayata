import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth,provider } from '../../firebase'
import * as CryptoJS from 'crypto-js'

const InitialHome = () => {
  const buttonHandler = async (e)=>{
    try{
      await signInWithPopup(auth,provider).then((data)=>{
        const encryptedEmail = encrypt(data.user.email)
        localStorage.setItem("email",encryptedEmail)
      })
      console.log("Successfully Signed In")
    }
    catch(error){
      console.error('Google Sign-In Error:', error);
    }
    e.stopPropagation();
  }
  const encrypt = ( plainText ) => {
    const cipherText = CryptoJS.AES.encrypt(plainText, auth.currentUser.email).toString()
    return cipherText
  }

  // const decrypt = ( cipherText ) => {
  //   const bytes = CryptoJS.AES.decrypt(cipherText, auth.currentUser.email )
  //   const plainText = bytes.toString(CryptoJS.enc.Utf8)
  //   return plainText
  // }
return (
  <div>
    <button onClick={buttonHandler}>Submit</button>
  </div>
)
}

export default InitialHome