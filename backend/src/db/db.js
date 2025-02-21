import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


// ------------- Database Connection ----------
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://navinagarwal0420:9wFvGxD7fEvnxjmr@notebook.4mljb.mongodb.net/?retryWrites=true&w=majority&appName=notebook`);
    // await mongoose.connect(`mongodb+srv://admin:sanjeev9021@valentine.b47od.mongodb.net/?retryWrites=true&w=majority&appName=valentine`);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB connection faild !!!: ", err);
  }
};

export default connectDB;
