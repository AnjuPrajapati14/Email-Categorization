const Bull = require("bull");
const dotenv = require("dotenv");

dotenv.config();

const emailQueue = new Bull("emailQueue", {
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  },
});
emailQueue.on("error", (err) => {
  console.error(" Redis connection error:", err);
});

emailQueue.on("waiting", (jobId) => {
  console.log(`Job ${jobId} is waiting to be processed...`);
});

module.exports = emailQueue;
