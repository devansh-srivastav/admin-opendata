import '../styles/globals.css'
import '../styles/register.css'
import React, { useState, useEffect } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Header from '../component/header';
import Footer from '../component/footer'


function MyApp({ Component, pageProps }) {
    
  useEffect(()=>{
    if(window) {
        sessionStorage.setItem('loggedIn', 'no');
    }
  },[]);

    return (<><Header/><NotificationContainer /><Component {...pageProps} /><Footer/> </>)
}

export default MyApp
