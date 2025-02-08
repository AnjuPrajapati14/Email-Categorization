// config.js
require("dotenv").config(); // Load .env file

const config = {
  mongoUri: process.env.MONGO_URI,
  redisHost: process.env.REDIS_HOST || "127.0.0.1",
  redisPort: process.env.REDIS_PORT || 6379,
  redisPassword: process.env.REDIS_PASSWORD || null,
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};

module.exports = config;
