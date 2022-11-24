import React from 'react'
import axios from 'axios'

const Home = () => {

  axios.post('http://localhost:4000/app/userData', {
      token: window.localStorage.getItem("token")
  }).then(res => {console.log(res.data)})
  .catch((err) => {console.log(err.res)})

  return (
    <div className="content">
        <h1>Restaurant</h1>
        <p>Enjoy a luxurious evening with a one of a kind view only at our restaurant</p>
    </div>

  );
}

export default Home
