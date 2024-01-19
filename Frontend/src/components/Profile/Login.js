import React, { useEffect, useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';

const Longin = () => {
    const [email , setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        // if(auth){
        //     navigate("/");
        // }
    },[])


    const handleLogin = async (event) => {
        event.preventDefault();
      
        try {
          let result = await fetch("http://localhost:5000/signin", {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (!result.ok) {
            // Handle non-2xx HTTP status codes
            throw new Error(`HTTP error! Status: ${result.status}`);
          }
      
          const responseText = await result.text();
          console.log(responseText);
          result = JSON.parse(responseText);
      
          if (result.name) {
            localStorage.setItem('user', JSON.stringify(result));
            navigate("/");
          } else {
            alert("Please enter correct details");
          }
        } catch (error) {
          console.error('Error:', error.message);
          alert("An error occurred. Please try again later.");
        }
      };     
    
      return (
        <div className='signinForm'>
          <h2 className='signinForm-name'>Sign In Form</h2>
          <form onSubmit={(e) => handleLogin(e)}>
            <div>
              <label className='signinForm-label' htmlFor="email" >Email:</label>
              <input className='signinForm-input'  
                placeholder='Enter email'
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className='signinForm-label' htmlFor="password">Password:</label>
              <input className='signinForm-input'               
                placeholder='Enter password'
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button className='signinForm-button' type="submit">Sign In</button>
            </div>
            <div>
              <a className='signinForm-text'>do not have an acconat?   </a>
              <Link to="/register">Register</Link>
            </div>

          </form>
        </div>
      );
}
 export default Longin;  