import React from 'react'
import "../styles/navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <>
   <nav className='navbar'>
    <div className="logo">
        <Link to={"/"}><h1>LOGO</h1></Link>
    </div>
  
        <ul className='nav-links'>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link>About</Link></li>
            <li><Link>Contact</Link></li>
        </ul>
    

    <div>
        <Link to={"/login"}><button className='reg'>Login</button></Link>
    </div>

   </nav>
   </>
  )
}

export default Navbar