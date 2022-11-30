import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { reservationsEndpoint } from '../constantValues'
import { confirmAlert } from 'react-confirm-alert'

const GuestForm = ({ reservationDetails }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    function reservationPostRequest(reservation){
      axios.post(reservationsEndpoint, reservation)
      .then(res =>{ 

        confirmAlert({
          title: 'Reservation created!',
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

      console.log(reservation)

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
      
      <input type='submit' value='Check avaliable tables' className='btn btn-block'/>
    </form>
  )
}

export default GuestForm