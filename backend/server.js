import express from 'express';
import cors from "cors";
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'  

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 3000;

// connceting to mongoBD database
connectDB();


app.get("/", (req,res) => {
    res.send("Hello this is server")
})

// API Routes
app.use("/api/users" , userRoutes);
app.use("/api/products" , productRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
