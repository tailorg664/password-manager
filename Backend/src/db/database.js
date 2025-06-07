import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    console.log(process.env.DATABASE_URL,'/Password-Manager');

    await mongoose.connect(`${process.env.DATABASE_URL}/Password-Manager`);

    console.log("MongoDB connection succeed!");
  } catch (err) {
    console.log(err.message);
  }
};
export default connectDB;
