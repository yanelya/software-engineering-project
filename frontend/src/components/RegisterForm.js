import React, { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
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

    const registered = {
      first: firstName,
      last: lastName,
      phone: phone,
      email: email
    }

    axios.post('http://localhost:4000/app/customers', registered)
    .then(res => 
      console.log(res.data))
    .catch((error) =>
      console.log('Error sending data:', error))
  
    setFirstName('')
    setLastName('')
    setPhone('')
    setEmail('')
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

      <input type='submit' value='Submit' className='btn btn-block'/>
    </form>
  )
}

export default RegisterForm