import React, { useState } from 'react'
import axios from 'axios'
import { customersEndpoint } from '../constantValues'

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [showBilling, setShowBilling] = useState(false)
  const [billingAddress, setBillingAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if(!firstName || !lastName || !phone || !email || !address|| !password|| (showBilling === true && !billingAddress)){
      alert('Missing fields')
      return
    }
    if(!paymentMethod){
      alert('Enter preferred payment method')
      return
    }

    const registered = {
      first: firstName,
      last: lastName,
      phone: phone,
      email: email,
      billing_address: billingAddress,
      mailing_address: address,
      payment_method: paymentMethod,
      password: password
    }

    axios.post(customersEndpoint, registered)
    .then(res => 
      console.log(res.data))
    .catch((error) =>
      console.log('Error sending data:', error))
  
    setFirstName('')
    setLastName('')
    setPhone('')
    setEmail('')
    setAddress('')
    setShowBilling(false)
    setBillingAddress('')
    setPaymentMethod('')
    setPassword('')
  }

  
  return (
    <div className='bottom-space'>
      <form className='container' onSubmit={onSubmit}> 

        <h1 className='center'>Register</h1>
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

        <div className='form-control'>
          <label>Address</label>
          <input type='text' placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>
            
        <div className='center'>
          <input name="billing" type='checkbox' onChange={() => setShowBilling((prev) => !prev)}/>
          <label htmlFor="billing"> Billing address is different as mailing address</label>
        </div>

        {showBilling &&

        <div className='form-control'>
          <label>Billing Address</label>
          <input type='text' placeholder='Billing Address' value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)}/>
        </div>

        }

        <div className='form-control'>
          <label htmlFor="payment">Choose preferred payment method:</label>
          <select name="payment" onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="Select" defaultValue hidden>-- Select --</option>
            <option value="Card">Card</option>
            <option value="Cash">Cash</option>
            <option value="Check">Check</option>
          </select >
        </div>

        <div className='form-control'>
          <label>Password</label>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <input type='submit' value='Submit' className='btn btn-block'/>
      </form>
    </div>
  )
}

export default RegisterForm