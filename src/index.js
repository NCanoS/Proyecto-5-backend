const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config();

//controllers
const {
    saveUser,
    updateUser,
    deleteUser,
    loginUser
} = require('./controllers/user.controller.js')

const server = express();

server.use(express.json());
server.use(cors({origin: '*'}));

mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.HOST_DB}`)
    .then(()=>console.log("Connected to database"))
    .catch((e)=>console.log("error: "+ e));

server.listen(process.env.PORT,()=>{
    return console.log("server running")
});

server.post('/register', saveUser)

server.put('/user/settings/:id', updateUser)

server.delete('/users/settings/:id', deleteUser)

server.post('/login', loginUser)