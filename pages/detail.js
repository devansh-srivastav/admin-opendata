import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function Home() {
    let router = useRouter();
  //const openDataUrl = "http://localhost:3001/password?username=";
  // const apiUrl = "http://localhost:3100/api/";


  const openDataUrl = "http://register.opendatabayern.de/password?username=";
  const apiUrl = "https://register-opendata-backend-7i7aqmgwqq-ey.a.run.app/api/";
  const ckanUrl = "http://opendatabayern.de/api/3/action/";
  const apikey = "e6cf1719-b1e4-47ec-aa33-a797bdd43858";

   const header = {
        'Authorization': apikey,
        'Content-Type': 'application/json',
    };
    const [username, setUser] = useState("");

  useEffect(()=>{
      if (window) {

          if ((sessionStorage.getItem('loggedIn') && sessionStorage.getItem('loggedIn') != 'no') || (localStorage.getItem('loginEmail'))) {
              setQuery(JSON.parse(localStorage.getItem('data')));
          }
          else {
              router.push('/');
          }
      }
      setLoad(true);

      let res = axios.get(ckanUrl + "organization_list?all_fields=True").then((res) => {
          
          for (let i = 0; i < res.data.result.length; i++) {
             
              let data = res.data.result[i];
              
              if (data.title == JSON.parse(localStorage.getItem('data')).org_title) {
                  setQuery((prevState) => ({
                      ...prevState,
                      'org': data.org
                  }))
                  setExist(true);
                  setLoad(false);
                      break;
              }
              setLoad(false);
             
          }
      }).catch((err) => {
        setLoad(false);
      })
  
    
  },[]);

    const [loading, setLoad] = useState(false);
    const [query, setQuery] = useState({
        comment: "",
        date: new Date(),
        email: "",
        name:"",
        surname:"",
        phone:"",
        org_title:"",
        desc:"",
        position:"",
        org: "",
        status:0
    });

 
    
    const addorg = async () => {
        setLoad(true);
        setQuery((prevState) => ({
            ...prevState,
            'status': 1
        }))
        let res = axios.post(ckanUrl + "organization_create", {
            name: query.org,
            title: query.org_title
        },
          { headers: header }
        ).then((res) => {
          if (res.status == 200)
             {
              approve();
             }
            }).catch((err) => {
                window.alert("Please try again")
            }) 
      }

    const decline = async () => {
        setLoad(true);
        setQuery((prevState) => ({
            ...prevState,
            'status': 2
        }))
        let res =await axios.post(apiUrl + "decline",query , { headers: header }).then(async (res) => {
            if (res.status == 200) {
                let b ='<p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:9pt;margin-bottom:0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Sehr geehrte(r) '+query.surname+' '+query.name+',</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">leider war es uns nicht m&ouml;glich, Ihre Anmeldung zu &uuml;berpr&uuml;fen und Sie zu kontaktieren. Bitte wenden Sie sich an&nbsp;</span><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#0000ff;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">opendatabayern@stmd.bayern.de</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">&nbsp;Wir freuen uns, von Ihnen zu h&ouml;ren!</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;">&nbsp;</p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Beachten Sie, dass dies eine automatische Antwort ist und nicht beantwortet werden sollte.</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;">&nbsp;</p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Vielen Gr&uuml;&szlig;e</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Ihr Open Data Bayern Team</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"><span style="border:none;display:inline-block;overflow:hidden;width:183px;height:70px;"><img src="https://lh5.googleusercontent.com/amvlLoYcHC1pOFFfrrtyJTp1ELMiDoo-Per1KDc7kxu_UwXhSWi7uOjqHaGBNj-DgMTPFVQYeBJCHGR5ieI2Nr1XaOKOI8i5xsizOYeuy-LksrbODYS5tYDiedpNg6cdhz_xd7Gq" width="183" height="70"/></span></span></p>'
                let ans = await send(b, "👋 Registrierungsbestätigung Open Data Bayern",query.email);
                NotificationManager.info('Request has been rejected', 'info');
                setLoad(false);
                router.push('/dashboard');
          }
      }).catch((err) => {
          window.alert("Please try again!")
      })
  }
  

    const approve = async () => {
        setLoad(true);
        setQuery((prevState) => ({
            ...prevState,
            'status': 1
        }))
        let res =await axios.post(apiUrl + "result", query, { headers: header }).then(async (res) => {
            let usern =await axios.get(apiUrl + "getUsername?email=" + query.email, { headers: header }).then(async (res) => {
                let link = openDataUrl + res.data.result[0].username;
                let b = '<div><p dir="ltr" style = "line-height:2.055;background-color:#ffffff;margin-top:9pt;margin-bottom:0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Sehr geehrte(r) ' + query.surname + ' ' + query.name + ',</span></p> <p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">vielen Dank f&uuml;r Ihre Registrierung bei Open Data Bayern.&nbsp;</span></p>  <p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Um den Registrierungsprozess abzuschlie&szlig;en, legen Sie bitte ein sicheres Passwort fest:&nbsp;</span><a href=' + link + ' style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#0000ff;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">' + link + '.</a><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#0000ff;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">&nbsp;</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Anschlie&szlig;end k&ouml;nnen Sie sich mit Ihrem&nbsp;</span><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"> Benutzernamen ' + res.data.result[0].username + ' </span><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">&nbsp;</span><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">&nbsp;</span><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">einloggen und Daten Ihrer Organisation ver&ouml;ffentlichen.</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Bei Fragen k&ouml;nnen Sie sich jederzeit gerne per E-Mail an uns wenden:&nbsp;</span><span style="font-size:11.5pt;font-family:Arial;color:#1d1c1d;background-color:#f8f8f8;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">&nbsp;</span><a href="mailto:opendatabayern@stmd.bayern.de" style="text-decoration:none;"><span style="font-size:10.5pt;font-family:Arial;color:#1155cc;background-color:#ffffff;font-weight:400;font-style:normal;font-variant:normal;text-decoration:underline;-webkit-text-decoration-skip:none;text-decoration-skip-ink:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">opendatabayern@stmd.bayern.de</span></a></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;">&nbsp;</p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Vielen Dank f&uuml;r Ihre Unterst&uuml;tzung und Ihren Beitrag zur Open Data Community in Bayern!</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;">&nbsp;</p> <p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Beachten Sie, dass dies eine automatisch erzeugte E-Mail ist. Bitte antworten Sie nicht auf diese E-Mail!</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Viele Gr&uuml;&szlig;e</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Ihr Open Data Bayern Team</span></p><p dir="ltr" style="line-height:2.055;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:9pt 0pt 0pt 0pt;"><span style="font-size:10.5pt;font-family:Roboto,sans-serif;color:#172b4d;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"><span style="border:none;display:inline-block;overflow:hidden;width:187px;height:72px;"><img src="https://lh5.googleusercontent.com/amvlLoYcHC1pOFFfrrtyJTp1ELMiDoo-Per1KDc7kxu_UwXhSWi7uOjqHaGBNj-DgMTPFVQYeBJCHGR5ieI2Nr1XaOKOI8i5xsizOYeuy-LksrbODYS5tYDiedpNg6cdhz_xd7Gq" width="187" height="72"/></span></span></p></div>'
                let ans = await send(b, "👋 Open Data Bayern Registrierung erfolgreich abgeschlossen", query.email);
                NotificationManager.success('Approved Successfully', 'Success');
                router.push('/dashboard');
            }).catch((err) => {
                NotificationManager.error('Please Try Again!', 'error');
                setLoad(false);
                router.push('/dashboard');
            })
        }).catch((err) => {
            NotificationManager.error('Please Try Again!', 'error');
            setLoad(false);
            router.push('/dashboard');
        })
        return true;
    }


    const send = async (body,subject,to) => {
        await axios.post(apiUrl+'email', { body: body, subject:subject,to:to })
            .then(

                (res) => {
                    
                }

            ).catch(
                (e) => console.log(e)
            )

    }

    const [isExist, setExist] = useState(false);
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
      if(query.comment!=null && query.date!=null && query.email!=null && query.name!=null && query.surname!=null && query.phone!=null && query.org!=null && query.position!=null)
         setValid(true)
      else
         setValid(false)
  };



  return (
    <div className={styles.container}>
          <Head>
              <script src=
                  "https://smtpjs.com/v3/smtp.js">
              </script>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
              <div className="register-admin container">
                  <div className="login-loader" style={loading ? { opacity: 1 } : { opacity: 0 }}> <Image src="/loader.gif" width="35" height="35" alt="" /></div>
          <div className="register-form-container">
            <div className="reg-details">
                          <h2>Angaben zur Nutzeranfrage</h2>
          
            
            </div>
            <form method="post" className="dataset-form login-form">
              <div className="form-group control-medium">
                <label className="control-label" htmlFor="field-login">
                Name
                </label>
                <div className="controls ">
                  <input
                    id="field-login"
                    type="text"
                    name="name"
                    value={query.name}
                    placeholder="z.B. Mustermann"
                    className="form-control"
                    onChange={handleChange()}
                    readOnly
                  />
                 
                </div>
              </div>
              <div className="form-group control-medium">
                <label className="control-label" htmlFor="field-login">
                Vorname
                </label>
                <div className="controls ">
                  <input
                    id="field-login"
                    type="text"
                    name="surname"
                    placeholder="z.B. Maria"
                    value={query.surname}
                    className="form-control"
                                      onChange={handleChange()}
                                      readOnly
                  />
                </div>
              </div>
                          <ReactTooltip id="t1" place="right" className="tooltip" effect="solid">Idealerweise verwenden Sie hier Ihre Arbeitsmail anstatt eines Funktionspostfachs.</ReactTooltip>
                          <ReactTooltip id="t2" place="right" className="tooltip" effect="solid">Ihre Telefonnummer dient dazu Sie bei Rückfragen erreichen zu können.</ReactTooltip>
                          <ReactTooltip id="t3" place="right" className="tooltip" effect="solid">Die von Ihnen bereitgestellten Daten werden unter dem Namen Ihrer Organisation veröffentlicht.</ReactTooltip>
                          <ReactTooltip id="t4" place="right" className="tooltip" effect="solid">Empfohlene Struktur:
              <ul>
                <li>Das Mission Statement der Organisation</li>
                <li>Angebotene Dienstleistungen</li>
                <li>Art von Daten die Ihre Organisation bereitstellen wird</li>
                <li>Potenzielle Nutzer Ihrer Daten</li>
              </ul>
              </ReactTooltip>

              <div className="form-group control-medium">
                <label className="control-label " htmlFor="field-login">
                Arbeitsmail
                </label>
                <div className="controls df">
                  <input
                    id="field-login"
                    type="text"
                    name="email"
                    value={query.email}
                    placeholder="z.B. maria.mustermann@opendatabayern.de"
                    className="form-control"
                                      onChange={handleChange()}
                                      readOnly
                  />
                                  <svg data-tip data-htmlFor="t1" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0003 1.66797C5.39616 1.66797 1.66699 5.39714 1.66699 10.0013C1.66699 14.6055 5.39616 18.3346 10.0003 18.3346C14.6045 18.3346 18.3337 14.6055 18.3337 10.0013C18.3337 5.39714 14.6045 1.66797 10.0003 1.66797ZM10.8337 15.8346H9.16699V14.168H10.8337V15.8346ZM12.5545 9.38047L11.8087 10.1471C11.2087 10.7471 10.8337 11.2513 10.8337 12.5013H9.16699V12.0846C9.16699 11.1638 9.54199 10.3305 10.142 9.7263L11.1795 8.6763C11.4795 8.3763 11.667 7.95964 11.667 7.5013C11.667 6.58047 10.9212 5.83464 10.0003 5.83464C9.07949 5.83464 8.33366 6.58047 8.33366 7.5013H6.66699C6.66699 5.65964 8.15866 4.16797 10.0003 4.16797C11.842 4.16797 13.3337 5.65964 13.3337 7.5013C13.3337 8.23464 13.0378 8.89714 12.5545 9.38047Z" fill="#131313"/>

</svg>
                </div>
              </div>
              <div className="form-group control-medium">
                <label className="control-label" htmlFor="field-login">
                Telefon
                </label>
                <div className="controls df">
                  <input
                    id="field-login"
                    type="text"
                    name="phone"
                    value={query.phone}
                    placeholder="z.B. 0111 3330-0"
                    className="form-control"
                                      onChange={handleChange()}
                                      readOnly
                  />
                                  <svg data-tip data-htmlFor="t2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0003 1.66797C5.39616 1.66797 1.66699 5.39714 1.66699 10.0013C1.66699 14.6055 5.39616 18.3346 10.0003 18.3346C14.6045 18.3346 18.3337 14.6055 18.3337 10.0013C18.3337 5.39714 14.6045 1.66797 10.0003 1.66797ZM10.8337 15.8346H9.16699V14.168H10.8337V15.8346ZM12.5545 9.38047L11.8087 10.1471C11.2087 10.7471 10.8337 11.2513 10.8337 12.5013H9.16699V12.0846C9.16699 11.1638 9.54199 10.3305 10.142 9.7263L11.1795 8.6763C11.4795 8.3763 11.667 7.95964 11.667 7.5013C11.667 6.58047 10.9212 5.83464 10.0003 5.83464C9.07949 5.83464 8.33366 6.58047 8.33366 7.5013H6.66699C6.66699 5.65964 8.15866 4.16797 10.0003 4.16797C11.842 4.16797 13.3337 5.65964 13.3337 7.5013C13.3337 8.23464 13.0378 8.89714 12.5545 9.38047Z" fill="#131313"/>
</svg>
                </div>
              </div>
              <br/>
              <h3>
Über Ihre Organisation</h3>
              <div className="form-group control-medium">
                <label className="control-label" htmlFor="field-login">
                Organisation
                </label>
                <div className="controls df">
                  <input
                    id="field-login"
                    type="text"
                    name="org_title"
                    value={query.org_title}
                    placeholder="z.B. Open Data Bayern oder Stadt München"
                    className="form-control"
                                      onChange={handleChange()}
                                      readOnly
                  />
                                  <svg data-tip data-htmlFor="t3" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0003 1.66797C5.39616 1.66797 1.66699 5.39714 1.66699 10.0013C1.66699 14.6055 5.39616 18.3346 10.0003 18.3346C14.6045 18.3346 18.3337 14.6055 18.3337 10.0013C18.3337 5.39714 14.6045 1.66797 10.0003 1.66797ZM10.8337 15.8346H9.16699V14.168H10.8337V15.8346ZM12.5545 9.38047L11.8087 10.1471C11.2087 10.7471 10.8337 11.2513 10.8337 12.5013H9.16699V12.0846C9.16699 11.1638 9.54199 10.3305 10.142 9.7263L11.1795 8.6763C11.4795 8.3763 11.667 7.95964 11.667 7.5013C11.667 6.58047 10.9212 5.83464 10.0003 5.83464C9.07949 5.83464 8.33366 6.58047 8.33366 7.5013H6.66699C6.66699 5.65964 8.15866 4.16797 10.0003 4.16797C11.842 4.16797 13.3337 5.65964 13.3337 7.5013C13.3337 8.23464 13.0378 8.89714 12.5545 9.38047Z" fill="#131313"/>
</svg>
                </div>
              </div>
              <div className="form-group control-medium">
                <label className="control-label" htmlFor="field-login">
                Webseite
                </label>
                <div className="controls
                ">
                  <input
                    id="field-login"
                    type="text"
                    name="website"
                    value={query.website}
                    placeholder="z.B. https://www.opendatabayern.de"
                    className="form-control"
                                      onChange={handleChange()}
                                      readOnly
                  />
                </div>
              </div>

              <div className="form-group control-medium">
                <label className="control-label" htmlFor="field-login">
                Beschreibung
                </label>
                <div className="controls  df">
                <textarea rows="5" type="text" name="desc" placeholder="Bitte stellen Sie Ihre Organisation in maximal 150 Wörter vor." 
                    className="form-control" 
                    onChange={handleChange()} 
                    value={query.desc}
                                      id="field-login"
                                  readOnly                                  />
                                  <svg data-tip data-htmlFor="t4" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0003 1.66797C5.39616 1.66797 1.66699 5.39714 1.66699 10.0013C1.66699 14.6055 5.39616 18.3346 10.0003 18.3346C14.6045 18.3346 18.3337 14.6055 18.3337 10.0013C18.3337 5.39714 14.6045 1.66797 10.0003 1.66797ZM10.8337 15.8346H9.16699V14.168H10.8337V15.8346ZM12.5545 9.38047L11.8087 10.1471C11.2087 10.7471 10.8337 11.2513 10.8337 12.5013H9.16699V12.0846C9.16699 11.1638 9.54199 10.3305 10.142 9.7263L11.1795 8.6763C11.4795 8.3763 11.667 7.95964 11.667 7.5013C11.667 6.58047 10.9212 5.83464 10.0003 5.83464C9.07949 5.83464 8.33366 6.58047 8.33366 7.5013H6.66699C6.66699 5.65964 8.15866 4.16797 10.0003 4.16797C11.842 4.16797 13.3337 5.65964 13.3337 7.5013C13.3337 8.23464 13.0378 8.89714 12.5545 9.38047Z" fill="#131313"/>
</svg>      
                </div>
              </div>
              <div className="form-group control-medium">
                <label className="control-label" htmlFor="field-login">
                Ihre Position
                </label>
                <div className="controls ">
                  <input
                    id="field-login"
                    type="text"
                    name="position"
                    value={query.position}
                    placeholder="z.B. Smart City Managerin"
                    className="form-control"
                                      onChange={handleChange()}
                                      readOnly
                  />
                </div>
              </div>
              <br/>
              <br/>
              <div className="form-group control-medium">
                <label className="control-label" htmlFor="field-login">
                Hinterlassen Sie uns Eine Nachricht
                </label>
                <div className="controls ">
                  
                  <textarea rows="5" type="text" value={query.comment} name="comment" placeholder="Ihre Nachricht (optional)" 
                    className="form-control" 
                    onChange={handleChange()} 
                    id="field-login" readOnly/>
                </div>
                          </div>
                          <div className="login-loader" style={loading ? { opacity: 1 } : { opacity: 0 }}> <Image src="/loader.gif" width="35" height="35" alt="" /></div>

                          {!isExist && <button  type="button" className="blue-btn active-btn" onClick={()=>addorg()}>Anfrage annehmen: Organisation erstellen und Bestätigunsmail schicken</button>}
                          {isExist && < button type="button" className="blue-btn" onClick={()=>approve()}>Anfrage annehmen: Bestätigunsmail schicken</button>}
                          <br />
                          <br />

                          <button className="white-btn " type="button"  onClick={()=>decline()}>Anfrage ablehnen: Ablehnungsmail schicken</button>
                          <br />
                          <br />
                          <button className="white-btn " type="button" onClick={()=>{router.push('/dashboard')}}>Zurück zum Dashboard</button>
                          <br />
                          <br />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
