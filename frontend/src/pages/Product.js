import React, { useEffect, useState } from 'react';
import '../css/productlist.css';
import { Link, json } from 'react-router-dom';


const Product = () => {
  const[product,setProduct]= useState([])
 ;

  useEffect(()=>{
     getProducts()
  },[])

  const getProducts = async()=>{
  try{
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization: JSON.parse(localStorage.getItem("token"))
      }
    })
    result= await result.json();
    setProduct(result);
  }catch(error){
    console.error('Error fetching products:', error);
  }
  }
  console.log("products",product);



  const deleteProduct= async(id)=>{
    try{
      let result =await fetch(`http://localhost:5000/product/${id}`,{
        method:'delete',
        headers:{
          authorization: JSON.parse(localStorage.getItem("token"))
        }
      })
      result = await result.json();
      if(result){
       getProducts();
      }
    }catch (error) {
      console.error('Error deleting product:', error);
    }
    
  }

 
const searchHandle = async(e)=>{
  e.preventDefault();
  try{
   let key = e.target.value;
   if(key){
    let result =await fetch(`http://localhost:5000/search/${key}`,{
      headers:{
        authorization: JSON.parse(localStorage.getItem("token"))
      }
    });
    result = await result.json();
    if(result){
     setProduct(result)
    }else{
      getProducts()
    }
   }
   
  }catch(error){

    console.error('Error search product:', error);
  }
 
}


 

  return (
<>
<h1 className='text-center' style={{fontSize:"25px", fontWeight:"bold",color:"gray",margin:"0",paddingTop:"2rem"}}>Product List</h1>
<nav className="navbar navbar-light bg-light">
  <div className="container-fluid">
    <form className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        style={{borderRadius:"20px", boxShadow:" 0 0 10px rgba(0, 0, 0, 0.2"}}
        onChange={searchHandle}
      />
      {/* <button className="btn btn-outline-info" type="submit" style={{backgroundColor:"#32a2a8"}}>
        Search
      </button> */}
    </form>
  </div>
</nav>

<div className='body'>
<table>
  <thead>
    <tr>
      <th>S.NO</th>
      <th>Name</th>
      <th>Price</th>
      <th>Company</th>
      <th>Category</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>

    {

    product.length>0 ? product.map((item,index)=>
     <tr key={item._id}>
      <td>{index+1}</td>
      <td>{item.name}</td>
      <td>${item.price}</td>
      <td>{item.company}</td>
      <td>{item.category}</td>
      <td><button className="delete-btn" onClick={()=>deleteProduct(item._id)}>Delete</button>
      <Link to={'/update/'+item._id} className="btn"  >Update</Link>
      </td>
    </tr>
   
    ) 
    :
    <p className="fw-bolder" style={{textAlign:"center",color:"red",fontSize:"35px"}}> No product found</p>
    }
    
  </tbody>
</table>
</div>
</>
  )
}

export default Product