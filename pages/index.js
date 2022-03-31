import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Home() {
    let router=useRouter();
 //const apiUrl = "https://registerbackend.opendatabayern.de/api/";
const apiUrl = "http://localhost:3100/api/";

    const [query, setQuery] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoad] = useState(false);
    const [change, setChange] = useState(false);
    const [valid, setValid] = useState(false);
    const handleChange = () => (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setQuery((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setChange(true);
        if (query.password != null && query.username != null)
            setValid(true)
        else
            setValid(false)
    };


    const login = () => {
        setLoad(true);
        const configs = { headers: { 'Content-Type': 'application/json' } };
            

           let res= axios.post(apiUrl + "adminLogin",query,configs).then((res) => {
                    if (res.status == 200) {
                        sessionStorage.setItem('loggedIn', 'yes');
                        NotificationManager.success('You are logged in', 'Success');
                        setLoad(false);
                        localStorage.setItem('loginEmail', query.email);
                        router.push("/dashboard")
                                
                           }
           }).catch((err) => {
               setLoad(false);
                            NotificationManager.error('Username or password is wrong', 'Error');
                        })
                    }
                   
                



    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main >
                <div className="container center-container">

                    <div className="register-form-container">
                        <div className="reg-details">
                            <h2>Bitte loggen Sie sich als
System Administrator ein.</h2>
                            <br />

                        </div>
                        <form method="post" className="dataset-form login-form">
                            <div className="form-group control-medium">
                                <label className="control-label" for="field-login">
                                    Benutzername
                </label>
                                <div className="controls ">
                                    <input
                                        id="field-login"
                                        type="text"
                                        name="username"
                                        value={query.username}
                                        placeholder=""
                                        className="form-control"
                                        onChange={handleChange()}
                                    />

                                </div>
                            </div>

                            <div className="form-group control-medium">
                                <label className="control-label" for="field-login">
                                    Passwort
                </label>
                                <div className="controls ">
                                    <input
                                        id="field-login"
                                        type="password"
                                        name="password"
                                        placeholder="************"
                                        value={query.password}
                                        className="form-control"
                                        onChange={handleChange()}
                                    />
                                </div>
                            </div>

                            <button type="button" className={!valid ? "blue-btn inactive-btn" : "blue-btn active-btn"} disabled={valid ? false : true} onClick={()=>login()}>Anmelden</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}