import React, { useState } from 'react';
import '../css/addproduct.css';
import { useNavigate } from 'react-router-dom';



const AddProduct = () => {
  const [name,setName] = useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]= useState("");
  const [company,setCompany]= useState("");
  const [error,setError] = useState(false);
  const navigate = useNavigate();

  const addProductHandle = async (e)=>{
    e.preventDefault();
    console.log(!name)
    if(!name || !price || !category || !company ){
      setError(true)
    return false;
    }

    console.log(name,price,category,company);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    console.log(userId._id);
    let result=await fetch('http://localhost:5000/add-product' ,{
      method:'post',
      body:  JSON.stringify({name,price,category,userId,company}),
      headers:{
        'Content-Type': 'application/json',
        authorization: JSON.parse(localStorage.getItem("token"))
      }
    });
    result = await result.json()
    console.log(result)
    navigate('/')
  }
  
  return (
  <div className='add'>
   <div className="container">
  <h2>Add Product</h2>
  <form>
    <div className="form-group">
      <label htmlFor="productName">Product Name:</label>
      <input type="text" id="productName" name="productName" required="" value={name} onChange={(e)=>{setName(e.target.value)}} />
     {error && !name && <span style={{color:'red'}}>Enter valid name </span>}
    </div>
    <div className="form-group">
      <label htmlFor="price">Price:</label>
      <input type="number" id="price" name="price" step="0.01" required="" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
      {error && !price && <span style={{color:'red'}}>Enter valid price </span>}
    </div>
    <div className="form-group">
      <label htmlFor="category">Category:</label>
      <input type="text" id="category" name="category" required="" value={category} onChange={(e)=>{setCategory(e.target.value)}} />
      {error && !category && <span style={{color:'red'}}>Enter valid category </span>}
    </div>
    
    <div className="form-group">
      <label htmlFor="company">Company:</label>
      <input type="text" id="company" name="company" required="" value={company} onChange={(e)=>{setCompany(e.target.value)}} />
      {error && !company && <span style={{color:'red'}}>Enter valid company </span>}
    </div>
   
    <div className="form-group">
      <button onClick={addProductHandle} type="submit">Add Product</button>
    </div>
  </form>
</div>
</div>
 
  
  )
}

export default AddProduct