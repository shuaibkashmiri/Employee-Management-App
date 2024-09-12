import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/sharedComponents/Navbar"
import Index from "./components/Index"
import Footer from "./components/sharedComponents/Footer"
import Signup from "./components/Signup";
import 'react-toastify/dist/ReactToastify.css'
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


function App() {
  return (

  <>
 <BrowserRouter>
<Navbar/>

<Routes>
<Route path="/" element={<Index/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
</Routes>


<Footer/>

 
 </BrowserRouter>
  
  </>
  );
}

export default App;
