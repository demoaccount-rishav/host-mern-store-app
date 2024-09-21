import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/database.js';
import productRouter from './routes/product.route.js';

dotenv.config();
const app = express();
// const port = 3000
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("frontend", "dist")));
    app.get("*", (req, res) => {
        return res.sendFile(path.resolve("frontend", "dist", "index.html"))
    })
}

app.listen(port, () => {
    connectDB();
    console.log(`Example app listening on port http://localhost:${port}`);
})

// 2AIxB3rTgi1DxIQB
// rishavbhowmick2002va