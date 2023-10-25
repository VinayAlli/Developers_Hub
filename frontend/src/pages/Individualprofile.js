import React, { useContext } from 'react'
import { UserdetailsContext } from '../App'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Individualprofile = () => {
  const {details,setDetails }=useContext(UserdetailsContext)
  const [rating,setRating]=useState(null)
  const [taskprovider,setTaskprovider]=useState(null)
  const [taskworker,setTaskworker]=useState(null)
  const [taskworkerName,setTaskworkerName]=useState(null)
  const [userrating,setUserrating]=useState([])
  const [taskinfo,setTaskinfo]=useState(null)
  const navigate=useNavigate()
  useEffect(() => {
    axios.get('https://developers-hub-api.vercel.app/myprofile',
    {headers:
      {'x-token':localStorage.getItem('token')}
    }).then(res=>setTaskprovider(res.data.fullname))
    
  }, [])
  localStorage.setItem('x-id',details.id)
  useEffect(() => {
    axios.get('https://developers-hub-api.vercel.app/userreviews', {
      headers: {
        'x-id': localStorage.getItem('x-id')
      }
    }).then(res => setUserrating(res.data));
  }, []);

  const allRatings = userrating.map(rating => rating.rating);
  const sum = allRatings.reduce((total, currentValue) => total + currentValue, 0);
  const averageRating = (sum / allRatings.length).toFixed(2);


  const changeHandler=(e)=>{
    setRating(e.target.value)
    setTaskworker(details.id)
    setTaskworkerName(details.fullname)
    
  }
  const gettaskinfo=(e)=>{
    setTaskinfo(e.target.value)
    setTaskworker(details.id)
    setTaskworkerName(details.fullname)
  }
  let review={
    taskprovider,taskworker,taskworkerName,rating
  }
  const sendrating=(e)=>{
    e.preventDefault()
    if(taskprovider!==taskworkerName){
    axios.post('https://developers-hub-api.vercel.app/addreview',review,{headers:
    {'x-token':localStorage.getItem('token')}
    }).then(
        res=>alert(res.data),
        navigate('/dashboard')
    )
   }
   else{
    alert("Not possible")
   }
  }

  let task={
    taskprovider,taskworker,taskworkerName,taskinfo
  }

  const sendtask=(e)=>{
    e.preventDefault()
    if(taskprovider!==taskworkerName){
    axios.post('https://developers-hub-api.vercel.app/addtask',task,{headers:
    {'x-token':localStorage.getItem('token')}
    }).then(
        res=>alert(res.data),
        navigate('/dashboard')
    )
   }
   else{
    alert("Not possible")
   }
  }
  return (
    <div>
    <form onSubmit={sendrating} className='profilecard'>
        <h2>User Profile</h2>
        <img src={'https://cdn-icons-png.flaticon.com/512/21/21104.png'} className="profileimg" alt="profile-img"/>
        <h5>{details.fullname}</h5>
        <h5>{details.email}</h5>
        <h5>{details.skill}</h5>
        <h5>Review</h5>
        <>
          
          {userrating.map((ratingsdata,index)=>(
        
        <><h5 key={index}>Reviewer : {ratingsdata.taskprovider}</h5><h5 key={index}>Rating : {ratingsdata.rating}/5</h5></>
        ))}
        </>
        <h5>
          Average Rating : {averageRating}/5
        </h5>
        <input type='number' name='rating' onChange={changeHandler}  placeholder='rating'/><br></br>
        <input className='btn btn-primary' type='submit'/>
      </form>
      <form className='profilecard' onSubmit={sendtask}>
        <h5>Want  to collaberate, provide the task </h5>
        <input type='text' placeholder='Provide the task details' name='taskinfo' onChange={gettaskinfo} /><br/>
        <input className='btn btn-primary' type='submit'/><br></br>
        <button onClick={()=>{navigate("/dashboard")}}>Back to Dashboard</button>
      </form>
        
    
    </div>
  )
}


