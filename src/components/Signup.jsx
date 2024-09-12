import React, { useState } from 'react'
import "./styles/signup.css"
import api from './utils/AxiosInstance';
import { ToastContainer,toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Signup = () => {
const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const userData={
    username,email,password
}

const handleSignup=async()=>{
    try {
        const res=await api.post("/user/signup",userData)
        if(res.data.message === "User Created Sucessfully"){
            toast.success("User Registered Sucessfully")
        }else{
            toast.error(res.data.message)
        }
        

        
    } catch (error) {
        console.log(error)
    }
}

const handleClick=()=>{
    handleSignup()
}



  return (
    <>
    
    <div className="main">
        <div><ToastContainer/></div>
        
        <div className='signup'>
            <h1>Register With Us!</h1>
            <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleClick}>Sign Up</button>
            <span>Already a user <Link to={"/login"}>Login</Link></span>
        </div>
    </div>
    </>
  )
}

export default Signup