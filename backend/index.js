const express = require('express');
const app = express();

const cors = require("cors");
app.use(cors());

require('./db/config');
const Product = require('./db/Product')
const User = require("./db/User");


app.use(express.json());


const bodyParser = require('body-parser')
app.use(bodyParser.json());

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-commerce'


app.post("/signup", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result}, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "somthing went wrong, Please try after somtimes" })
      }
      res.send( {result, auth: token })
    })
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

app.post("/login", async (req, res) => {
  try {
    console.log(req.body)
    if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res.send({ result: "somthing went wrong, Please try after somtimes" })
          }
          res.send( {user, auth: token })
        })

      } else {
        res.send({ result: "NO USER FOUND" })
      }
    } else {
      res.send({ result: "NO USER FOUND" })
    }
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})


app.post('/add-product', verifyToken,async (req, res) => {
  try {
    const { name, price, category, company } = req.body;
    const product = new Product({ name, price, category, company });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
});


app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("somthing broke!");
})



app.get('/products',verifyToken,async (req, res) => {

  try {
    let products = await Product.find();
    res.json(products)
  } catch (error) {

    res.status(500).json({ error: 'internal server error' })
  }
});

app.delete('/product/:id',verifyToken,async (req, res) => {

  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.get('/product/:id',verifyToken,async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put('/productUpdate/:id',verifyToken,async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, company } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.company = company || product.company;


    await product.save();
    res.json(product);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})


app.get('/search/:key',verifyToken, async (req, res) => {

  try {
    let result = await Product.find({
      "$or": [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } }
      ]
    })
    res.send(result)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

function verifyToken(req,res,next){
  let token = req.headers['authorization']
  if(token){
     token = token.split(' ')[0];
     console.log("middleware called if",token)
     Jwt.verify(token,jwtKey,(err,valid)=>{
      if(err){
         res.status(401).send({result:"please provide valid token"})
      }else{
          next();
      }
     })
  }else{
    res.status(403).send({result:"please add token with header"})
  }
 
}

app.listen(5000);