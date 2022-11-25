import React from 'react'
import { useState } from 'react'

const GuestForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [numOfguests, setNumOfguests] = useState('')

    const onSubmit = (e) => {
      e.preventDefault()

      if(!firstName || !lastName || !phone || !email || !numOfguests){
          alert('Missing fields')
          return
        }
    
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
        setNumOfguests('') 
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

      <div className='form-control'>
        <label>Number of Guests</label>
        <input type='text' required placeholder='Number of Guests' value={numOfguests} onChange={(e) => setNumOfguests(e.target.value)}/>
      </div>

      <input type='submit' value='Check avaliable tables' className='btn btn-block'/>
    </form>
  )
}

export default GuestForm