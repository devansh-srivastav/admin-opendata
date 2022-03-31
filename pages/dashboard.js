import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router";
import ReactTooltip from "react-tooltip";
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Home() {
    
   
  let router=useRouter();
   const apiUrl = "http://localhost:3100/api/";
   // const apiUrl = "https://registerbackend.opendatabayern.de/api/";
    const [data, setData] = useState([]);
    const [loading, setLoad] = useState(false);

    const setInfo = (i)  => {
      localStorage.setItem('data',JSON.stringify(data[i]));
      router.push('/detail')
  };

    useEffect(() => {
        setLoad(true)
      if(window) {
          if(!sessionStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn')=='no')
           { router.push('/');}
         
      }

      const configs = { headers: { 'Content-Type': 'application/json' } };
            

           let res= axios.get(apiUrl + "requests").then((res) => {
                    if (res.status == 200) {
                       setData([...res.data.result]);
                        setLoad(false)
                           }
           }).catch((err) => {
               setLoad(false)
                            window.alert(err)
                        })
    },[]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
              <div className="container dash-container">
                
                  <div className="dashboard">
                   
               <header className="module-content page-header hug">
              <ul className="nav nav-tabs">  
                <li className="tab">
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    
                    <path
                      d="M9.33398 4.41797C10.2994 4.41797 11.0782 3.63339 11.0782 2.66797C11.0782 1.70255 10.2994 0.917969 9.33398 0.917969C8.36857 0.917969 7.58398 1.70255 7.58398 2.66797C7.58398 3.63339 8.36857 4.41797 9.33398 4.41797ZM4.66732 4.41797C5.63273 4.41797 6.41148 3.63339 6.41148 2.66797C6.41148 1.70255 5.63273 0.917969 4.66732 0.917969C3.7019 0.917969 2.91732 1.70255 2.91732 2.66797C2.91732 3.63339 3.7019 4.41797 4.66732 4.41797ZM4.66732 5.58464C3.30523 5.58464 0.583984 6.26714 0.583984 7.6263V9.08464H8.75065V7.6263C8.75065 6.26714 6.0294 5.58464 4.66732 5.58464ZM9.33398 5.58464C9.16482 5.58464 8.97523 5.5963 8.77107 5.61672C9.44773 6.1038 9.91732 6.76005 9.91732 7.6263V9.08464H13.4173V7.6263C13.4173 6.26714 10.6961 5.58464 9.33398 5.58464Z"
                      fill="#787878"
                    />
                  </svg>
                  Nutzeranfragen
                </li>
              </ul>
            </header>
                      <div className="login-loader" style={loading ? { opacity: 1 } : { opacity: 0 }}> <Image src="/loader.gif" width="35" height="35" alt="" /></div>

                      {data.map((data,index)=>{
                           return(<div className="module-content content-card" id={index} onClick={()=>setInfo(index)}>
                           <div className="page_primary_action">
                               <strong>Nutzer: {data.name}</strong>
                               <br />
                               <span>Organisation: {data.org_title}</span>
                               <br />
                               <span>Position: {data.position}</span>
                               <br />
                               <span>Eingegangen am: {data.timeStamp.substring(8,10)+"."+data.timeStamp.substring(5,7)+"."+data.timeStamp.substring(0,4)}</span>
                               <br />
                               <span className="blue-span">Status: Offen</span>
                           </div>
                       </div>)
                      }) 
                      }
                      {
                          data.length == 0 && <span>Aktuell gibt es keine ausstehenden Nutzeranfragen.  </span>
                      }
          </div>
        </div>
      </main>
    </div>
  );
}
