import React, { useState } from 'react'
import axios from 'axios'
import { customersEndpoint } from '../constantValues'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

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

  function registerPostRequest(registered) {
    axios.post(customersEndpoint, registered)
    .then(res =>{ 

      confirmAlert({
        title: 'Registered',
        message: `Welcome ${firstName}!`,
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
      setAddress('')
      setShowBilling(false)
      setBillingAddress('')
      setPaymentMethod('')
      setPassword('')
      })
      
    .catch((error) =>
      console.log('Error sending data:', error))
  }

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

    confirmAlert({
      title: 'Confirm to submit',
      message: `Register with the following information? \n
      First Name: ${firstName} 
      Last Name: ${lastName} 
      Phone Number: ${phone}
      Email: ${email}
      Mailing Address: ${address} ${showBilling ? `\nBilling Address: ${billingAddress}` : ''}
      Payment Method: ${paymentMethod}
      Password: ${password}
      `,
      buttons: [
        {
          label: 'Yes',
          onClick: () => registerPostRequest(registered)
        },
        {
          label: 'No'
        }
      ]
    })
  }

  
  return (
    <div className='bottom-space'>
      <form className='container' onSubmit={onSubmit}> 

        <h1 className='center'>Register</h1>
        <div className='form-control'>
          <label>First Name</label>
          <input id="FirstNameValidation" pattern="[a-z A-Z]{2,}" type='text' required placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </div>

        <div className='form-control'>
          <label>Last Name</label>
          <input id = "LastNameValidation" pattern="[a-z A-Z]{2,}" type='text' required placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>

        <div className='form-control'>
          <label>Phone Number</label>
          <input id="phone" type='tel' required pattern ="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="xxx-xxx-xxxx" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>

        <div className='form-control'>
          <label>Email</label>
          <input id ="EmailValidation" title ="Must be a valid email" pattern="[a-zA-Z0-9._+-]+@[a-zA-Z0-9 -]+\.[a-z]{2,}" type='email' required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className='form-control'>
          <label>Address</label>
          <input id="AddressValidation" type='text' required placeholder='123 Sugar Cup Ct' value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>
            
        <div className='center'>
          <input name="billing" type='checkbox' onChange={() => setShowBilling((prev) => !prev)}/>
          <label htmlFor="billing"> Billing address is different as mailing address</label>
        </div>

        {showBilling &&

        <div className='form-control'>
          <label>Billing Address</label>
          <input type='text' required placeholder='Billing Address' value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)}/>
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
          <input id="pwd" title="Must contain at least 8 characters and have at least one uppercase and lowercase letter and at least one number" type="password" name="pwd" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div>
        <input type='submit' value='Submit' className='btn btn-block'/>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm