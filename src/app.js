import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import productRoute from './router/products';
import categoryRoute from './router/category';
import authRoute from './router/auth';

const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json())

app.use("/api",productRoute);
app.use("/api",categoryRoute);
app.use("/api",authRoute);

mongoose.connect('mongodb://localhost:27017/assignment')
    .then(() => console.log("Kết nối db thành công"))
    .catch((error) => console.log(error));
    
const PORT = 8000;
app.listen(PORT, () => {
    console.log("Server is running port", PORT);
})