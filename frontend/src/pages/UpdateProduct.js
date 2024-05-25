import React from 'react';
import '../css/updateproduct.css';
import { useState ,useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

const UpdateProduct = () => {
  const [name,setName] = useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]= useState("");
  const [company,setCompany]= useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
   getproductdetail();
  },[])

 const  getproductdetail =async ()=>{

  try{
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      headers:{
        authorization: JSON.parse(localStorage.getItem("token"))
      }
    }
  );
    result = await result.json();
    console.log(result);
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
  }catch (error) {
      console.error('Error fetching products:', error);
    }
    
   
  }

const UpdateProduct =async (e)=>{
  e.preventDefault();
try{
  console.log(name,price,category,company)

  let result = await fetch(`http://localhost:5000/productUpdate/${params.id}`,{
 method:'put',
 body:JSON.stringify({name,price,category,company}),
 headers:{
   'Content-Type':'application/json',
    authorization: JSON.parse(localStorage.getItem("token"))

 }
  });
  if(result.ok){
   console.log('Product updated successfully');
  }else{
   console.error('Failed to update product');
  }
 
 result = await result.json();
 console.log(result)

}catch (error) {
  console.error('Error updating product:', error);
}
navigate('/')
}

  return (
   <>
   <div className='body'>
   <div className="container">
  <h2>Update Product</h2>
  <form>
    <div className="form-group">
      <label htmlFor="productName">Product Name</label>
      <input type="text" id="productName" name="productName" required="" value={name} onChange={(e)=>{setName(e.target.value)}} />
    </div>
    <div className="form-group">
      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        min={0}
        step="0.01"
        required=""
        value={price}
        onChange={(e)=>{setPrice(e.target.value)}}
      />
    </div>
    <div className="form-group">
      <label htmlFor="category">Category</label>
      <input type="text" id="productName" name="productName" required="" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
    </div>
    <div className="form-group">
      <label htmlFor="productName">Company</label>
      <input type="text" id="productName" name="productName" required="" value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
    </div>
    <input type="submit" defaultValue="Update Product" onClick={UpdateProduct} />
  </form>
</div>
</div>

   
   </>
  )
}

export default UpdateProduct