const {userModel} = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const {generateJWT} = require('../utils/jwt.js');

const saveUser = async(req, res)=>{
    try {
        const user = new userModel({
            email : req.body.email,
            password: req.body.password
        })
        await user.save()
        .status(201)
        .json({
            message: 'Usuario creado con éxito'
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const updateUser = async(req, res)=>{
    try {
        await userModel.findByIdAndUpdate(
            req.params.id,
            {
                email : req.body.email,
                password: req.body.password
            }
        )
        return res
        .status(200)
        .json({
            message: 'Usuario actualizado con éxito'
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const deleteUser = async(req, res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res
        .status(200)
        .json({
            message: 'Usuario eliminado correctamente'
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const loginUser = async(req, res)=>{
    const { email, password } = req.body;

    try {
       const user = await userModel.findOne({
        email: email,
       })
       if(!user) return res.json({
        message: 'Usuario no encontrado',
        isAuth: false
       }).send()

        const isMatch = bcrypt.compareSync(password, user.password);

        if (isMatch) {
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
    }
}
module.exports ={
    saveUser,
    updateUser,
    deleteUser,
    loginUser
}