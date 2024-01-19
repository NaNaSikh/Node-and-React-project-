import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./icons/logo.png";

const Nav = () => {


  const auth = localStorage.getItem("user");
  const navigate = useNavigate()
  const logout = () => {
    console.log("signedOut");
    localStorage.clear();
    navigate('/signin');
  }
  return (

    <div>
      <img className="logo" src={Logo} alt='Logo'/>
        {
           auth ? 

      <ul className="nav-ul">
        {/* <li><Link to="/">All</Link></li> */}
        <li><Link to="/Movies">Movies</Link></li>
        <li><Link to="/Music">Music</Link></li>
        <li><Link to="/Sport">Sport</Link></li>
        <li><Link onClick={logout} to="/register" >Logout</Link>  </li>
        <li><Link to="/Profile">Profile</Link> </li>
      </ul>
          :
          <ul className="nav-ul">
            <li> <Link to="/signin">Sign in</Link></li>
            <li><Link  to="/register">Register</Link></li>
          </ul>

        }
        
      
    </div>
   );
}

export default Nav;
