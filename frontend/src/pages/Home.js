import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { userDataEndpoint } from '../constantValues'

const Home = () => {
  const [userName, setUserName] = useState('Guest')

  axios.post(userDataEndpoint, {
      token: window.localStorage.getItem("token")
  }).then(res => {
    setUserName(res.data.data.first)
  }).catch((err) => {console.log(err.res)})

  return (
    <div className="content"> 
        <h1>Welcome {userName}</h1>
        <p>Enjoy a luxurious evening with a one of a kind view only at our restaurant</p>
        <p>We are open from 11:00 A.M. to 10:00 P.M.</p>
    </div>
  );
}

export default Home
