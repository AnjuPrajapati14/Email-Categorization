const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Ensures new connection management
      serverSelectionTimeoutMS: 30000, // 5 seconds timeout for server selection
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000, // 10 seconds timeout for initial connection
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDB;
