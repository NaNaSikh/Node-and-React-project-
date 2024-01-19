import React, { useEffect, useState } from 'react';
import {UserNavigate, useNavigate} from 'react-router-dom';

const Register = () => {
    
       

        const [name,setName] = useState("");
        const [lastName,setLastname] = useState("");
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [phoneNumber,setphoneNumber] = useState("");
        const navigate = useNavigate()

        useEffect(() => {
            const auth = localStorage.getItem('user');
            if (auth) {
                navigate("/")
            }

        })
        const handleChange = (e) => {
          const { name, value } = e.target;
          if (name === 'name') {
            setName(value);
          }  else 
          if (name === 'lastName') {
            setLastname(value);
          }  else
          if (name === 'email') {
            setEmail(value);
          } else 
          if (name === 'password') {
            setPassword(value);
          } else
          if (name === 'phoneNumber') {
            setphoneNumber(value);
          } 
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          console.log('Form submitted:', name, lastName, email,password,phoneNumber);
          let result = await fetch("http://localhost:5000/register",
          {
            method: 'post',
            body: JSON.stringify({name, lastName, email,password,phoneNumber}),
            headers: {
                'Content-Type': 'application/json'
            }});
          result = await result.JSON;
          console.log(result);
          localStorage.setItem("user" , JSON.stringify({name, lastName, email,password,phoneNumber}));
          navigate('/signin');
        };


    return(
        <div>
       
        <form className='registerForm' onSubmit={handleSubmit}>
        <h2 className='registerForm-name'>Registration Form</h2>
          <div>
            <label className='registerForm-label' htmlFor="name">First Name:</label>
            <input className='registerForm-input'
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label  className='registerForm-label'  htmlFor="lastName">Last Name:</label>
            <input className='registerForm-input'
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className='registerForm-label'  htmlFor="email">Email:</label>
            <input className='registerForm-input'
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
          <label className='registerForm-label'  htmlFor="phoneNumber">Phone Number:</label>
          <input className='registerForm-input'
            type="tel"  
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
          <div>
            <label className='registerForm-label'  htmlFor="password">Password:</label>
            <input className='registerForm-input'
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <button className='registerForm-button' type="submit">Register</button>
          </div>
        </form>
      </div>  
      
    )
}

export default Register;
