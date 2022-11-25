import React from 'react'
import { useState } from 'react'
import isFieldEmpty from '../IsFieldEmpty';
import axios from 'axios'
import { loginEndpoint } from '../constantValues';

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

        axios.post(loginEndpoint, {
            email: loginFields.email,
            password: loginFields.password
        }).then(res => {console.log(res.data)
            if(res.data.status === "ok"){
                alert("login succesful")
                window.localStorage.setItem("token", res.data.data)
                window.localStorage.setItem("isLoggedIn", true)
                window.location.href = "/"
            }
        })
        .catch((err) => {console.log(err.res)})
    } 

  return (
    <div className='container'>
        <h1 className='bottom-space'>Login</h1>
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