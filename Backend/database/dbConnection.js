import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/JobHunt`, {
    });
    console.log("Database connected successfully");
  } catch (error) {
    // console.log(error);
    
    console.log("Database connection failed");
  }
};

export default dbConnection;