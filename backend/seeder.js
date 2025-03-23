import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product } from "./models/product.model.js";
import { User } from "./models/user.model.js";
import products from "./data/products.js";

dotenv.config();

// Connect to mongoDB

mongoose.connect(process.env.MONGO_URI);

// function to seed data

const seedData = async () => {
  try {
    // clear the existing data
    await Product.deleteMany();
    await User.deleteMany();

    // create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // assign the default user ID to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // Insert the product in database
    await Product.insertMany(sampleProducts);

    console.log("Product data Seeded successfully.");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data", error);
    process.exit(1)
  }
};

seedData();  