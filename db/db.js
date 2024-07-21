const mongoose = require("mongoose");
const password = process.env.PASSWORD;

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://amalsaji218:${password}@cluster0.wfm2xt4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
