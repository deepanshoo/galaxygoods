const express = require('express');
const server = express();

const mongoose = require('mongoose');
const { createProduct } = require('./controller/Product');
const productRouter=require('./routes/Products')
const categoriesRouter=require('./routes/Categories')
const brandsRouter=require('./routes/Brands')
const cors=require('cors')


//setting up middleware
server.use(cors({
    exposedHeaders: ['X-Total-Count']
}))
server.use(express.json());//to parse req.body
server.use('/products',productRouter.router);
server.use('/categories',categoriesRouter.router);
server.use('/brands',brandsRouter.router);

main().catch(err=>console.log(err))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/galaxygoods-backend');
    console.log('database connection established')
}
server.get('/',(req,res)=>{
    res.json({status:'success'})
})


server.listen(8000,()=>{
    console.log('server is running')
})