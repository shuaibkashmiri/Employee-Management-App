import React, { useState } from 'react'
import "./styles/login.css"
import api from './utils/AxiosInstance';
import { ToastContainer,toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate()
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
    const userData={
       email,password
    }
    
    const handleLogin=async()=>{
        try {
            const res=await api.post("/user/login",userData)
            if(res.data.message === "User Logged in Sucessfully"){
               navigate("/dashboard")
                
            }else{
                toast.error(res.data.message)
            }
            
    
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleClick=()=>{
        handleLogin()
    }
    
    
    
      return (
        <>
        
        <div className="main">
            <div><ToastContainer/></div>
            
            <div className='login'>
                <h1>Login To Your Account</h1>
                  <input type="text" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleClick}>Log-In</button>
                <span>Click <Link to={"/signup"}>here</Link> to create a New Account</span>
            </div>
        </div>
        </>
  )
}

export default Login