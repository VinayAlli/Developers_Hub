import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Developer Hub.png';

import './Navbar.css';
import {AuthContext} from '../App'

export const Navbar = () => {
  //To know whether user is signed in or not
  const {isAuthenticated,setIsAuthenticated, login, logout }=useContext(AuthContext)
  
  return (
    <div className="nav" >
      <div className='logo'>
        <img src={logo} alt="Developers Hub" />
      </div>
      <div className='links'>
        <p><Link to='/' style={{ textDecoration: 'none', color: 'black' }}>Home</Link></p>

        {isAuthenticated ? (
          <>
            <p><Link to='/dashboard' style={{ textDecoration: 'none', color: 'black' }}>All Profiles</Link></p>
            <p><Link to='/myprofile' style={{ textDecoration: 'none', color: 'black' }}>My Profile</Link></p>
            <p><Link to='/login' onClick={logout}  style={{ textDecoration: 'none', color: 'black' }}>Logout</Link></p>
          </>
        ) : (
          <>
            <p><Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>Register</Link></p>
            <p><Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>Login</Link></p>
          </>
        )}
      </div>
    </div>
  )
}
