import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import productRouter from './routes/product.route.js';

dotenv.config();
const app = express();
// const port = 3000
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRouter);

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port http://localhost:${port}`);
})

// 2AIxB3rTgi1DxIQB
// rishavbhowmick2002va