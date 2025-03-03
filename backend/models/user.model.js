import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userScheam = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
            
        }
    }
)