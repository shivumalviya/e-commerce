import React, { useEffect, useState } from 'react';
import '../css/signup.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
 
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  useEffect(()=>{
    const auth = localStorage.getItem("user");
    if(auth){
      navigate('/')
    }
  })

 


  const collectData = async (e) => {
    e.preventDefault();
    console.log(name, email, password)

    try{
      let result = await fetch('http://localhost:5000/signup', {
        method: 'post',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      result = await result.json()
      console.log(result);
      localStorage.setItem('user',JSON.stringify(result.result))
      localStorage.setItem('token',JSON.stringify(result.auth))
      navigate("/")
    }catch(error){
      console.error('somthing Error:', error);
    }
  }


  return (
    <>
      <div className="container">
        <h2>Sign Up</h2>
        <form>
          <input type="text" name="fullname" placeholder="Full Name" required="fullname" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" name="email" placeholder="Email" required="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" name="password" placeholder="Password" required="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="submit" onClick={collectData} defaultValue="Sign Up" />
          <div className="card_terms">
            <span>
              Have already in account?
              <Link to="/login" className='link'>Login here</Link>
            </span>
          </div>

        </form>
      </div>
    </>
  )
}

export default Signup