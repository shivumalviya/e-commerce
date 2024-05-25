
import './App.css';
import { Routes, Route, BrowserRouter} from 'react-router-dom';
import Nav from './pages/Nav';
import Profile from './pages/Profile';
import Product from './pages/Product';
import AddProduct from './pages/AddProduct';
import UpdateProduct  from './pages/UpdateProduct'
import Logout from './pages/Logout';
import Footer from './pages/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import RouteComponent from './privateRoute/RouteComponent';



function App() {
  return (

  <>
  <BrowserRouter>
  <Nav/>
  <Routes>
    <Route element={<RouteComponent/>}>
    <Route path='/' element={<Product/>} />
     <Route path='/add-product' element={<AddProduct/>} />
     <Route path='/update/:id' element={<UpdateProduct/>} />
     <Route path='/logout' element={<Logout/>} />
     <Route path='/profile' element={<Profile/>} />
    </Route>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    </Routes>
    <Footer/>
  </BrowserRouter>
  
    
   </>
  );
}

export default App;
