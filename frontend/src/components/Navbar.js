import React from 'react'
import '../App.css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const [isLoggedIn] = useState(window.localStorage.getItem("isLoggedIn"))


  const onSignOut = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("isLoggedIn")
    window.location.href = "/"
  } 

  return (
    <div>
      <nav className='nav'>
        <span className='title'>
          <img src='/logo2.png' className="logo" alt='logo'/>
          <Link to="/" className='site-title'>Restaurant</Link>
        </span>

        <ul>
          <CustomLink to='/Reservation'>Make a Reservation</CustomLink>
          {!isLoggedIn && <CustomLink to='/Login'>Login</CustomLink>}
          {!isLoggedIn && <CustomLink to='/Register'>Register</CustomLink>}
          {isLoggedIn && <button onClick={onSignOut}>Sign Out</button>}
        </ul>
        
      </nav>
    </div>
  )
}


export function CustomLink({to, children, ...props}){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end:true})
  return(
    <div className={isActive? 'active': ''}>
      <Link to={to}{...props}>
        {children}
      </Link>
    </div>
  )
}

export default Navbar 
