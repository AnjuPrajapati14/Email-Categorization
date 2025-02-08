const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const emailRoutes = require("./routes/emailRoutes");
const redisRoutes = require("./routes/redisRoutes");
const errorHandler = require("./middlewares/errorHandler");
const subscribeToJobQueue = require("./workers/emailWorker");

dotenv.config(); // Load environment variables

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/emails", emailRoutes); // Email upload and status check routes
//app.use("/api", emailRoutes);
app.use("/api/redis", redisRoutes); // Redis-specific routes

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);

  // Start listening for background jobs
  subscribeToJobQueue();
});
