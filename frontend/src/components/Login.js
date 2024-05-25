import React, { useEffect, useState } from 'react';
import '../css/login.css'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]= useState('');
 
  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
      navigate('/')
    }
  },[])


  const loginHandle = async (e)=>{
    e.preventDefault();
    try{

      let result =await fetch('http://localhost:5000/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
          'Content-Type': 'application/json'
        }
  
      });
      result = await result.json();
      console.log(result)
      if(result.auth){
        localStorage.setItem('user',JSON.stringify(result.user));
        localStorage.setItem('token',JSON.stringify(result.auth));

        navigate('/');
      }else{
        alert('please enter correct details')
      }
    }catch(error){
      console.error('somthing Error:', error);
    }
  }


  return (
   <>
   <div className="container">
  <h2>Login</h2>
  <form>
  <input type="email" name="email" placeholder="Email" required="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type="password" name="password"  placeholder="Password"  required="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
    <input type="submit" defaultValue="Login"  onClick={loginHandle}/>
    <div className="card_terms">
  <span>
    Don't have an account?
     <Link to="/signup" className='link'>Signup here</Link>
  </span>
</div>
  </form>
</div>
   </>
  )
}

export default Login