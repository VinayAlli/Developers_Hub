import axios from 'axios'
import React,{useState} from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom';

export const Register = () => {
 
  const navigate = useNavigate();
    const [data,setData]= useState({
        fullname:"",
        email:"",
        mobile:"",
        skill:"",
        password:"",
        confirmpassword:""
      })
      const changeHandler=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
      }
      const submitHandler=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/register", data).then(()=>{
          alert('Registered Successfully')
          navigate('/login')
          }).catch((err)=>alert('error'))
      }
  return (
    <div className="registerform">
        <center>
            <form onSubmit={submitHandler}>  
                <h2>Create Your Account</h2>
                <label>Name</label><br/>
                <input type="text" name="fullname" id="fullname" onChange={changeHandler} placeholder='Name'/><br/>
                <label>Email Address</label><br/>
                <input type="email" name="email" id="email" onChange={changeHandler} placeholder='Email'/><br/>
                <label>Mobile</label><br/>
                <input type="number" name="mobile" id="mobile" onChange={changeHandler} placeholder='Mobile'/><br/>
                <label>Skills</label><br/>
                <input type="text" name="skill" id="skill" onChange={changeHandler} placeholder='Skill1, skill2, ...'/><br/>
                <label>Password</label><br/>
                <input type="password" name="password" id="password" onChange={changeHandler} placeholder='Password'/><br/>
                <label>Confirm Password</label><br/>
                <input type="password" name="confirmpassword" id="confirmpassword" onChange={changeHandler} placeholder='Confirm Password'/>
                <br/>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
        </center>
       
    </div>
  )
}
