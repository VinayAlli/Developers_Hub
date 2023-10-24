import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

import { UserdetailsContext } from '../App'

export const Myprofile = () => {
  
    const [data,setData]=useState({})
    const [ratings,setRatings]=useState([])
    const [tasks,setTasks]=useState([])
    
    
    useEffect(() => {
        axios.get('http://localhost:8000/myprofile',
        {headers:
          {'x-token':localStorage.getItem('token')}
        }).then(res=>setData(res.data))
        
      }, [])

      useEffect(() => {
        axios.get('http://localhost:8000/myreviews',
        {headers:
          {'x-token':localStorage.getItem('token')}
        }).then(res=>setRatings(res.data))
        
      }, [])

      useEffect(() => {
        axios.get('http://localhost:8000/getalltasks',{headers:
        {'x-token':localStorage.getItem('token')}
      }).then(res => setTasks(res.data));
      }, []);

      const allRatings = ratings.map(rating => rating.rating);
      const sum = allRatings.reduce((total, currentValue) => total + currentValue, 0);
      const averageRating = sum / allRatings.length;
  return (
    <div className='profilecard'>
        <h2>My Profile</h2>
        <img src={'https://cdn-icons-png.flaticon.com/512/21/21104.png'} className="profileimg" alt="profile-img"/>
        <h5>{data.fullname}</h5>
        <h5>{data.email}</h5>
        <h5>{data.skill}</h5>
        {ratings.map((ratingsdata,index)=>(
        
          <><h5 key={index}>Reviewer : {ratingsdata.taskprovider}</h5><h5 key={index}>Rating : {ratingsdata.rating}/5</h5></>
        ))}
        <h5>
          Average Rating : {averageRating}/5
        </h5>
        {tasks.map((tasksdata,index)=>(
        
        <><h5 key={index}>Task Provider : {tasksdata.taskprovider}</h5><h5 key={index}>Task : {tasksdata.taskinfo}</h5></>
      ))}
    </div>
  )
}
