import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import Herosection from "../components/Herosection"
import Version from "../components/Version"
import Page3 from "../components/Page3"
import Footer from "../components/Footer"
import { googleLogout } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import Chatpage from './Chatpage'
import axios from 'axios'

export default function Landing_Page() {

  const [state, setState] = useState(true)
  const [onHome, setLocation] = useState(true)
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState([])
  const [isLight, setTheme] = useState(false)
  const [enabled, setEnabled] = useState(false)

  const handleTheme = () => {
    if (isLight) {
      setTheme(false)
      setEnabled(false)
      localStorage.setItem('light', false)
    }
    else {
      setTheme(true)
      setEnabled(true)
      localStorage.setItem('light', true)
    }
  }

  // useEffect(() => {
  //   if (localStorage.getItem('state') == 'true') {
  //     setState(true)
  //   } else {
  //     setState(false)
  //   }
  //   if (localStorage.getItem('onHome') == 'true') {
  //     setLocation(true)
  //   } else {
  //     setLocation(false)
  //   }
  //   if (localStorage.getItem('light') == 'true') {
  //     setTheme(true)
  //     setEnabled(true)
  //   } else {
  //     setTheme(false)
  //     setEnabled(false)
  //   }

  // }, []);
  useEffect(() => {
    try{
      if (localStorage.getItem('state') == 'true') {
        setState(true)
      } else {
        setState(false)
      }
    }catch(e){
      localStorage.setItem('state', 'false')
      setState(false)
    }
    
    try{
      if (localStorage.getItem('onHome') == 'true') {
        setLocation(true)
      } else {
        setLocation(false)
      }
    }catch(e){
      localStorage.setItem('onHome', 'true')
      setLocation(true)
    }
    try{

      if (localStorage.getItem('light') == 'true') {
        setTheme(true)
        setEnabled(true)
      } else {
        setTheme(false)
        setEnabled(false)
      }
    }catch(e){
      localStorage.setItem('light', 'false')
      setEnabled(false)
      setTheme(false)
    }
    // JSON.parse(localStorage.getItem('chat')).length
  }, []);

  const fetchUser = (user) => {
    if (user) {
      console.log(user.access_token)
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          // headers: {
          //   Authorization: `Bearer ${user.access_token}`,
          //   Accept: 'application/json'
          // }
          // console.log(user.access_token)
        })
        .then((res) => {
          setProfile(res.data);
          console.log(res.data)
          localStorage.setItem('name', profile.name)
        })
        .catch((err) => console.log("Fucked"));
    }
  }

  const login = useGoogleLogin({
    onSuccess: (credentiaResponse) => {
      try {
        setUser(credentiaResponse)
      } catch (e) {
        console.log("Errorrooro")
      }
      setState(false)
      setLocation(false)
      console.log("Fetch User called")
      fetchUser(credentiaResponse)
      console.log("Fetch User Ended")

      localStorage.removeItem('state')
      localStorage.removeItem('onHome')
      localStorage.setItem('state', false)
      localStorage.setItem('onHome', false)
    },
  });

 

  const logout = () => {
    console.log("log")
    setState(true)
    setLocation(true)
    localStorage.removeItem('state')
    localStorage.removeItem('onHome')
    localStorage.setItem('state', true)
    localStorage.setItem('onHome', true)
    googleLogout();
  }

  const handleLocation = () => {
    setLocation(true)
    localStorage.removeItem('onHome')
    localStorage.setItem('onHome', true)
  }

  const handleLocation2 = () => {
    setLocation(false)
    localStorage.removeItem('onHome')
    localStorage.setItem('onHome', false)
  }

  return (
    <div>
      {
        onHome ?
          <div>
            <Navbar state={state} login={login} logout={logout} />
            <Herosection login={login} state={state} handleLocation2={handleLocation2} />
            <Version />
            <Page3 />
            <Footer />
          </div> :
          <div>
            <Chatpage enabled={enabled} setTheme={setTheme} setEnabled={setEnabled} isLight={isLight} handleTheme={handleTheme} setProfile={setProfile} logout={logout} state={state} name={profile.name} handleLocation={handleLocation} setLocation={setLocation} setState={setState} />
          </div>
      }
    </div>

  )
}
