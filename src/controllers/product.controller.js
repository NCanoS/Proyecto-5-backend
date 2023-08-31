//product conroller
const {productModel} = require('../models/product.model.js');

const getProducts = async(req, res)=>{
    try {
        const products = await productModel.find();
        return res
        .status(200)
        .json({
            message: 'Productos encontrados',
            products: products
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

const getProductById = async(req, res)=>{
    try {
        const product = await productModel.findById(req.params.id);
        return res
        .status(200)
        .json({
            message: 'Producto encontrado',
            product: product
        })
        .send()
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

module.exports = {
    getProducts,
    getProductById
    
}
