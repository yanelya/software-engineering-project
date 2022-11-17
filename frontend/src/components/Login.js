import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!email || !password){
        alert('Missing fields')
        return
        }
    } 

  return (
    <div>
        <h1 className='sub-header'>Login</h1>
        <form onSubmit={onSubmit}> 
            <div className='form-control'>
                <label>Email</label>
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='form-control'>
                <label>Password</label>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <input type='submit' value='Login' className='btn btn-block'/>
        </form>
    </div>
  )
}

export default Login