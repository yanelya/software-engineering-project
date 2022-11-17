import React from 'react'
import { useState } from 'react'

const GuestForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!firstName || !lastName || !phone || !email){
            alert('Missing field')
            return
          }
      
          const guestInfomration = {
            first: firstName,
            last: lastName,
            phone: phone,
            email: email
          }
    } 

  return (
    <form onSubmit={onSubmit}> 
      <div className='form-control'>
        <label>First Name</label>
        <input type='text' placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      </div>

      <div className='form-control'>
        <label>Last Name</label>
        <input type='text' placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
      </div>

      <div className='form-control'>
        <label>Phone Number</label>
        <input type='text' placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)}/>
      </div>

      <div className='form-control'>
        <label>Email</label>
        <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
    </form>
  )
}

export default GuestForm