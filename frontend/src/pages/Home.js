import React, { useContext } from 'react'
import '../App.css';

import {AuthContext} from '../App'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const {isAuthenticated,setIsAuthenticated, login, logout }=useContext(AuthContext)
  const navigate = useNavigate();
  return (
    <div className="App" >
      <center><h2>Developers Hub</h2></center>
      <center><h4>Create a developer profile/portfolio, share posts and get help from other developers</h4></center>
      <br/>
      <center>
      {isAuthenticated ? (
          <>
            <button className='btn btn-primary' onClick={()=>{navigate('/dashboard');}}>All profiles</button>
            <button className='btn btn-primary' on onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button className='btn btn-primary' onClick={()=>{navigate('/register');}}>Signup</button>
            <button className='btn btn-primary' onClick={()=>{navigate('/login');}}>Login</button>
          </>
        )}
      </center>
    </div>
  )
}
