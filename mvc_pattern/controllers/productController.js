const Product = require('../models/productModel');

//business logic

const getProducts = async(req, res) => {
    try{
        const allProducts = await Product.find();
        if(!allProducts || allProducts.length === 0){
            res.json({
                message: "There is no product"
            })
        }
        res.status(200).json({
            success: true,
            products: allProducts,
        })
    }
    catch{
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
const createProduct = async (req, res) => {
    try{
        const {name, price, category, description} = req.body;
        const newProduct = new Product({name, price, category, description});
        await newProduct.save();
        res.status(200).json({
            success: true,
            product: newProduct,
        })
    }
    catch{
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
const updateProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const {name, price, category, description} = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, {name, price, category, description},{new:true})
        res.status(200).json({
            success: true,
            product: updatedProduct,
        })
    }
    catch{
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
const deleteProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id,{new:true});
        if(!deletedProduct){
            res.json({
                message: "Product not found, cannot be deleted!"
            })
        }
        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully!",
            product: deletedProduct,
        })
    }
    catch{
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = {getProducts, updateProduct, createProduct, deleteProduct}