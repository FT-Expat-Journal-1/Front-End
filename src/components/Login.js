// Component - Traveler's login page

import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/';
import { NavLink } from 'react-router-dom';

export const Login = props => {

    const [userLogin, setUserLogin] = useState({
        username: '',
        password: ''
    })
  
    const handleChange = event => {
      setUserLogin({
        ...userLogin,
        [event.target.name]: event.target.value
    })}
    
    const submitLogin = event => {
      event.preventDefault();
      axiosWithAuth()
      .post('api/auth/login', userLogin)
      .then(res =>{
        console.log('User Login', res);
            window.localStorage.setItem('token', res.data.token);
            window.localStorage.setItem('traveler_id', res.data.id);
            const travelerID = window.localStorage.getItem('traveler_id');

            if(parseInt(travelerID) === 12) { 
              props.history.push('/internal-test'); 
            }
            else{
              props.history.push('/dashboard'); 
            };
      })
      .catch(err=>{
          console.log('Login post error', err)
        });
    }
    
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={submitLogin}>
          <input name='username' type='text' placeholder='User Name' value={userLogin.username} onChange={handleChange} />
          <input name='password' type='password' placeholder='Password' value={userLogin.password} onChange={handleChange} />
          <button>Login</button>
          <label>Don’t have an account?</label>
          <button className='signUpBtn'><NavLink to="/">Sign up</NavLink></button>
        </form>
      </div>
    );
  };