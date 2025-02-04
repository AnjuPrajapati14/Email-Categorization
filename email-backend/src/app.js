const express = require("express");
const connectDB = require("./config/db");
require("./workers/emailWorker.js");
const emailRoutes = require("./routes/emailRoutes");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler"); // Error handler middleware
const cors = require("cors");
dotenv.config(); // Load environment variables
const bodyParser = require("body-parser");
const redisRoutes = require("./routes/redisRoutes");

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api", emailRoutes);
app.use("/api/redis", redisRoutes);

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000; // Use environment variable for port if available
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
