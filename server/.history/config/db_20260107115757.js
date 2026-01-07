import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected : ${conn}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
