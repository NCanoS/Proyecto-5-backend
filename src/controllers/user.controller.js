const {userModel} = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const {generateJWT} = require('../utils/jwt.js');

//get users
const getUserById = async(req, res)=>{
    try {
        const user = await userModel.findById(req.params.id);
        return res
        .status(200)
        .json({
            message: 'Usuario encontrado',
            user: user
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const getUserByEmail = async(req, res)=>{
    try {
        const user = await userModel.findOne({
            email: req.params.email
        })
        return res
        .status(200)
        .json({
            message: 'Usuario encontrado',
            user: user
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

//generate Create functions

const registerUser = async(req, res)=>{
    try {
        const user = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            gender: req.body.gender,
            country: req.body.country,
            city: req.body.city,
            email: req.body.email,
            password: req.body.password,
        })
        await user.save()
        .status(201)
        .json({
            message: 'Usuario Registrado'
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

//generate Update functions

const updateUser = async(req, res)=>{
    try {
        await userModel.findByIdAndUpdate(
            req.params.id,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                gender: req.body.gender,
                country: req.body.country,
                city: req.body.city,
                password: req.body.password
            }
        )
        return res
        .status(200)
        .json({
            message: 'Información actualizada correctamente'
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}


//create login function
const loginUser = async(req, res)=>{

    try {
       const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password
       })
       if(!user) return res.json({
        message: 'Usuario no encontrado',
        isAuth: false
       })
       return res.json({
        message: 'Acceso correcto',
        isAuth: true
       })
       
    }
    catch (error) {
        return res.json({
            error: error
        })
    }
       /* const isMatch = bcrypt.compareSync(password, user.password);

        if (password === user.password) {
            const token = generateJWT(user._id);
    
            return res
                    .status(200)
                    .json({
                        message: 'Inicio de sesión correcto',
                        user: {
                            email: user.email
                        },
                        token: token
                    })
                    .send()
        } else {
            return res
                    .status(401)
                    .json({
                       message: 'Usuario incorrecto'
                    })
                    .send()
        }
    } catch (error) {
        return res.json({
            error: error
        })
    }*/
}


module.exports ={
    getUserById,
    getUserByEmail,
    registerUser,
    updateUser,
    loginUser
}