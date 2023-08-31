const {Schema, Types, model} = require('mongoose');   


const userSchema = new Schema({
    id: Types.ObjectId,
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    country: String,
    city: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

const userModel = model('users', userSchema);

module.exports = {userModel};