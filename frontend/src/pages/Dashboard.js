import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import '../App.css'
import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom'
import { Individualprofile } from './Individualprofile';
import { UserdetailsContext } from '../App';



export const Dashboard = () => {
  const [data,setData]=useState([])
  const [user,setUser]=useState()
  const {details,setDetails }=useContext(UserdetailsContext)
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('https://developers-hub-api.vercel.app/myprofile',
    {headers:
      {'x-token':localStorage.getItem('token')}
    }).then(res=>setUser(res.data))
    
  }, [])
  useEffect(() => {
    axios.get('https://developers-hub-api.vercel.app/allprofiles',
    {headers:
      {'x-token':localStorage.getItem('token')}
    }).then(res=>setData(res.data))

  }, [])

  

  const profileInfo=(id,fullname, email, skill)=>{
    setDetails({id,fullname,email,skill})
    navigate('/individualprofile');
  }
  return (
    <>
    <div className='dashboard'>
      <center><h3>All Users</h3></center>
      {
        data.length>=1?data.map((profile,index)=>
          <div key={index}  className='profilecard'>
          <img src={'https://cdn-icons-png.flaticon.com/512/21/21104.png'} className="profileimg" alt="profile-img"/>
          <h5 key={index} >{profile.fullname}</h5>
          <h5 key={index} >{profile.email}</h5>
          <h5 key={index}>{profile.skill.split(',').map(skills=><>{skills} </>)}</h5>

          <button key={index} onClick={()=>profileInfo(profile._id,profile.fullname,profile.email,profile.skill)} className='btn btn-primary'>View Profile</button>
          </div>
          ):null
      }
    </div>
    </>
  )
}
