import '../styles/globals.css'
import '../styles/register.css'
import React, { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
    
  useEffect(()=>{
    if(window) {
        sessionStorage.setItem('loggedIn', 'no');
    }
  },[]);

  return <Component {...pageProps} />
}

export default MyApp
