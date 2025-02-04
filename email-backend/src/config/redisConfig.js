const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1", // localhost if using locally
  port: process.env.REDIS_PORT || 6379, // default Redis port
  password: process.env.REDIS_PASSWORD, // if using a password
  db: 0, // default Redis database
  retryStrategy: (times) => Math.min(times * 50, 2000), // Retry strategy
  //  maxRetriesPerRequest: 20, // retry limit for requests
});
redis.on("connect", () => console.log("Connected to Redis successfully!"));
redis.on("error", (err) => console.error("Redis connection error:", err));

module.exports = redis;
