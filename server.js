const express= require('express');
const mongoose= require('mongoose');
const connect = require('./config/db.js');
const Product=require('./models/productModel');
const app = express();

connect();

app.use(express.json());

app.get('/products', async (req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json(products);
    } catch (error) {
       res.status(500).json({message: error.message});
        
    }

})
app.get('/product/:id',async (req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findById(id);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
    

})
app.post('/products', async (req,res)=>{
   try {
     const product=await Product.create(req.body);
     res.status(200).json(product);
   } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
   }
})
app.put('/product/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            res.status(404).json({message: `product with ${id} is not found`});
        }
        res.status(200).json(product);
        const updatedProduct=await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }

    app.delete('/products/:id',async(req,res)=>{
        try {
            const {id}=req.params;
            const product=await Product.findByIdAndDelete(id);
            if(!product){
             return res.status(404).json({message: `product with id ${id} is not found`});
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
       
        
    })
})
app.listen(5000,()=>{
    console.log('the server is running on port 5000...');
})