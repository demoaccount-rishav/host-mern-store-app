import mongoose from 'mongoose';
import Product from '../models/product.model.js';


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ 'success': true, 'data': products });
    } catch (error) {
        console.log("Error in fetching products", error.message);
        return res.status(500).json({ 'success': false, 'message': 'Internal Server Error' });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ 'success': false, 'message': 'invalid product id' });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        return res.status(201).json({ 'success': true, 'updatedData': updatedProduct });
    } catch (error) {
        return res.status(500).json({ 'success': false, 'message': 'internal server error' });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        // console.log(`Product Deleted`);
        // console.warn(ans);
        return res.status(201).json({ 'success': true, 'message': `product deleted` });
    } catch (error) {
        return res.status(404).json({ 'success': false, 'message': 'product not found' });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ 'success': false, 'message': 'Please provide all the fields' });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        return res.status(201).json({ 'success': true, 'data': newProduct });
    } catch (error) {
        console.log("Error in creating a new product", error.message);
        return res.status(500).json({ 'success': false, 'message': 'internal server error' });
    }
}