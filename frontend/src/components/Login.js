import React from 'react'
import { useState } from 'react'
import isFieldEmpty from './IsFieldEmpty';
import axios from 'axios'


const Login = () => {
    const [loginFields, setLoginFields] = useState({
        email: "",
        password: ""
    })

    const onSubmit = (e) => {
        e.preventDefault()

        if(isFieldEmpty(loginFields)){
            alert('Missing fields')
            return
        }

        axios.post('http://localhost:4000/app/login', {
            email: loginFields.email,
            password: loginFields.password
        }).then(res => {console.log(res.data)})
        .catch((err) => {console.log(err.res)})


        // alert('email: ' + loginFields.email +  ' password: ' + loginFields.password)
    } 

  return (
    <div>
        <h1 className='sub-header'>Login</h1>
        <form onSubmit={onSubmit}> 
            <div className='form-control'>
                <label>Email</label>
                <input type='text' placeholder='Email' value={loginFields.email} onChange={(e) => setLoginFields({...loginFields, email: e.target.value})}/>
            </div>

            <div className='form-control'>
                <label>Password</label>
                <input type='password' placeholder='Password' value={loginFields.password} onChange={(e) => setLoginFields({...loginFields, password: e.target.value})}/>
            </div>

            <input type='submit' value='Login' className='btn btn-block'/>
        </form>
    </div>
  )
}

export default Login