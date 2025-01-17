const Product = require('../models/productModel')

//business logic

const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        if (!allProducts || allProducts.length === 0) {
            res.json({
                message: "There is no product"
            })
        }
        res.status(200).json({
            success: true,
            products: allProducts,
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the id from the request parameters
        const product = await Product.findById(id); // Fetch product by ID

        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${id} not found`, // Include the id in the message
            });
        }

        res.status(200).json({
            success: true,
            id: id, // Include the id explicitly in the response
            product: product,
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message, // Optionally include the error message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price, category, description } = req.body;
        const newProduct = new Product({ name, price, category, description });
        await newProduct.save();
        res.status(200).json({
            success: true,
            product: newProduct,
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, category, description } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, { name, price, category, description }, { new: true })
        res.status(200).json({
            success: true,
            product: updatedProduct,
        })
    }
    catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id, { new: true });
        if (!deletedProduct) {
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
    catch {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = { getProducts, updateProduct, createProduct, deleteProduct, getProductById }