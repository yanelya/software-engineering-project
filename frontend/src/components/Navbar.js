import React from 'react'
import '../App.css'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='nav'>
        <Link to="/" className='site-title'>
          Restaurant
        </Link>
        <ul>
              <CustomLink to='/Register'>
                Register
              </CustomLink>
              <CustomLink to='/Reservation'>
                Reservation
              </CustomLink>
        </ul>
    </nav>
  )
}

function CustomLink({to, children, ...props}){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end:true})
  return(
    <li className={isActive? 'active': ''}>
      <Link to={to}{...props}>
        {children}
      </Link>
    </li>
  )
}

export default Navbar