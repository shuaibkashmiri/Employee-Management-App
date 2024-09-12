import React, { useEffect, useState } from 'react'
import "./styles/dashboard.css"
import Authorized from '../auth/Authorized'
import api from './utils/AxiosInstance';

const Dashboard = () => {
    Authorized();
    const [name,setName]=useState("")

    const getData=async()=>{
        try {
            const userData =await api.get("/user/details");
            setName(userData.data.message.userDetails.username)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getData()
    })
  return (
    <>
    <div className="main">
        <h1>Hello! {name} Welcome To Your Secure Dashboard</h1>
    </div>
    </>
  )
}

export default Dashboard