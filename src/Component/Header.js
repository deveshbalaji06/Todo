
import * as React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';
import { db } from './Firebase';
export default function Header({ isLogin, setisLogin,setData }) {

  function signUpWithGoogle() {
    const auth = getAuth();
    let google_provider = new GoogleAuthProvider();
    signInWithPopup(auth, google_provider)
      .then(() => {
          
          setData();
      
          setisLogin(true);

         });
  
      }

      
  

  return (
    <>

      {isLogin &&
        <div className='header'>
          <h1>TODO LIST</h1>

        </div>
      }
      {!isLogin &&
        <div className='header'>
          <h1>Please login</h1>
          <p onClick={signUpWithGoogle} className="social-button"
            id="google-connect">
            <span>Google</span>
          </p>
        </div>
      }
    </>
  )
}


