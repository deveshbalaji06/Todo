
import * as React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';
import { db } from './Firebase';
import Box from '@mui/material/Box';
import checklist from '../images/Checklist.jpg'
import logo from './optimalpath.png'; // Tell webpack this JS file uses this image
import Grid from '@mui/material/Grid';

export default function Header({ isLogin, setisLogin, setData, setUserDetail, setUserPhoto, setUserEmail, setUserName }) {


  function signUpWithGoogle() {
    const auth = getAuth();
    let google_provider = new GoogleAuthProvider();
    signInWithPopup(auth, google_provider)
      .then((res) => {

        setUserDetail(res);
        setUserPhoto(res.user.photoURL);
        setUserEmail(res.user.email);
        setUserName(res.user.displayName);
        setData();

        setisLogin(true);

      });

  }


  function signUpWithFacebook() {
    const auth = getAuth();
    let facebook_provider = new FacebookAuthProvider();
    signInWithPopup(auth, facebook_provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

      })

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

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <img src={checklist} alt="Logo" className='logo' />
            </Grid>
            <Grid item xs={6}>
              <h3 className='welcome'>
                Welcome to Notes App!
              </h3>
              <p className='quotes1'>
              "When your heart speaks,
              </p>
              <p className='quotes2'>
              take good notes..."
              </p>
              <p onClick={signUpWithGoogle} className="social-button"
                id="google-connect">
                <span>Google</span>
              </p>
              <p onClick={signUpWithFacebook}
                className="social-button"
                id="facebook-connect">
                <span>Facebook</span>
              </p>
            </Grid>

          </Grid>





        </div>
      }
    </>
  )
}


