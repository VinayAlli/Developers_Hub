import React,{useContext, useState} from 'react'
import axios from 'axios';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../App'

export const Login = () => {
  const {isAuthenticated,setIsAuthenticated, login, logout }=useContext(AuthContext)
  const navigate = useNavigate();
  const [auth,setAuth]=useState(false)
  const [data,setData]= useState({
    email:"",
    password:""
  })
  const changeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    axios.post('https://developers-hub-api.vercel.app/login',data).then(
        res=>{localStorage.setItem('token',res.data.token);setAuth(true);setIsAuthenticated(localStorage.getItem('token'))}
    ).catch((err)=>alert('error'))
  }
  
  if (auth){
     navigate('/dashboard');
  }
  return (
    <div className="loginform">
        <center>
        <form onSubmit={submitHandler}>
            <h2>Sign In</h2>
            <label>Email</label><br/>
            <input type="email" name="email" id="email" placeholder='Email' onChange={changeHandler} required/><br/>
            <label>Password</label><br/>
            <input type="password" name="password" id="password" placeholder='Password' onChange={changeHandler} required/>
            <br/>
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        </center>
        

    </div>
  )
}
