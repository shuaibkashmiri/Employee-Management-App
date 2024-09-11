import React from 'react'
import "../styles/navbar.css"

const Navbar = () => {
  return (
   <>
   <nav className='navbar'>
    <div className="logo">
        <h1>LOGO</h1>
    </div>
  
        <ul className='nav-links'>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    

    <div>
        <button className='reg'>Login</button>
    </div>

   </nav>
   </>
  )
}

export default Navbar