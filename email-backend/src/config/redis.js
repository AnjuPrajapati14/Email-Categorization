const Redis = require("ioredis");
const { redisHost, redisPort, redisPassword } = require("./config");

const redis = new Redis({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
  retryStrategy: (times) => Math.min(times * 50, 2000),
  maxRetriesPerRequest: 20,
});

redis.on("connect", () => console.log("Connected to Redis successfully!"));
redis.on("error", (err) => console.error("Redis connection error:", err));

module.exports = redis;
