import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { reservationsEndpoint } from '../constantValues'
import { confirmAlert } from 'react-confirm-alert'
import { useNavigate } from 'react-router-dom'
import { userDataEndpoint } from '../constantValues'

const GuestForm = ({ reservationDetails }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const dataFetchedRef = useRef(false)
    let navigate = useNavigate()

    const [isLoggedIn] = useState(window.localStorage.getItem("isLoggedIn"))

    if(isLoggedIn){
      axios.post(userDataEndpoint, {
        token: window.localStorage.getItem("token")
      }).then(res => {
        setFirstName(res.data.data.first)
        setLastName(res.data.data.last)
        setPhone(res.data.data.phone)
        setEmail(res.data.data.email)
      }).catch((err) => {console.log(err.res)})
    }

    function reservationPostRequest(reservation){
      axios.post(reservationsEndpoint, reservation)
      .then(res =>{ 

        confirmAlert({
          title: 'Reservation created!',
          message: 'No show will have minimum $10 charge',
          buttons: [
            {
              label: 'Okay'
            }
          ]
        })
  
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
      })
        
      .catch((error) =>
        console.log('Error sending data:', error))
    }

    useEffect(() => {
      if (dataFetchedRef.current) 
        return
      dataFetchedRef.current = true
      
      confirmAlert({
        title: 'Register?',
        message: 'Register before making reservation?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {navigate('/Register')}
          },
          {
            label: 'No'
          }
        ]
      })
    })

    const onSubmit = (e) => {
      e.preventDefault()

      if(!firstName || !lastName || !phone || !email){
          alert('Missing fields')
          return
        }
      
      
      const reservation = {
        first: firstName,
        last: lastName,
        phone: phone,
        email: email,
        date: reservationDetails.date.toDateString(),
        time: reservationDetails.time, 
        guests: reservationDetails.guests,
        table_number: reservationDetails.table_number
      }

      confirmAlert({
        title: 'Confirm reservation',
        buttons: [
          {
            label: 'Yes',
            onClick: () => reservationPostRequest(reservation)
          },
          {
            label: 'No'
          }
        ]
      })

    } 

  return (
    <form onSubmit={onSubmit}> 
      <div className='form-control'>
        <label>First Name</label>
        <input type='text' required placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      </div>

      <div className='form-control'>
        <label>Last Name</label>
        <input type='text' required placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
      </div>

      <div className='form-control'>
        <label>Phone Number</label>
        <input type='text' required placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)}/>
      </div>

      <div className='form-control'>
        <label>Email</label>
        <input type='email' required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      
      <input type='submit' value='Make reservation' className='btn btn-block'/>
    </form>
  )
}

export default GuestForm