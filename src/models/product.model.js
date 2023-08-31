//product schema
const {Schema, Types, model} = require('mongoose');

const productSchema = new Schema({
    id: Types.ObjectId,
    name: String,
    description: String,
    price: Number,
    imageUrl: String
    }
    );
    
    const productModel = model('products', productSchema);
    
    module.exports = {productModel};
