import express from 'express';

import {
    createProduct,
    deleteProduct,
    getProducts,
    updateProduct
} from '../controllers/product.controller.js';


const productRouter = express.Router();

productRouter.get('/', getProducts)

productRouter.post('/', createProduct)

productRouter.put('/:id', updateProduct)

productRouter.delete('/:id', deleteProduct);

export default productRouter;