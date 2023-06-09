const {Schema, Types, model} = require('mongoose');

const userSchema = new Schema({
    id: Types.ObjectId,
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

const userModel = model('users', userSchema);

module.exports = {userModel};