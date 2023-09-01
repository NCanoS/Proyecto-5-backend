const cors = require('cors');
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//user controllers
const {
    getUserById,
    getUserByEmail,
    registerUser,
    updateUser,
    loginUser
} = require('./controllers/user.controller.js');

//product controllers
const {
    getProductById,
    getProducts   
} = require('./controllers/product.controller.js');


//initialize express


server.use(express.json());

//middlewares
server.use(cors());

//connect to mongoose

mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.HOST_DB}`)
    .then(()=>console.log("Connected to database"))
    .catch((e)=>console.log("error: "+ e));

server.listen(process.env.PORT,()=>{
    return console.log("server running on port" + process.env.PORT)
});


//user routes
server.get('/users/:id', getUserById)
 
server.post('/register', registerUser)

server.put('/user/settings/:id', updateUser)

server.post('/api/login', loginUser)

//product routes
server.get('/products/:id', getProductById)

server.get('/products', getProducts)