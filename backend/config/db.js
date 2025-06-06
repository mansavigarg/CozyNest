import mongoose from "mongoose";


const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected successfully!");
    }
    catch(e){
        console.error("Error while connecting MongoDB", e);
        process.exit(1);
    }
}

export default connectDB