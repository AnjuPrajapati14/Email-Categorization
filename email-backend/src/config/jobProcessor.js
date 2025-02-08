const redis = require("./redis");

const processJob = async (jobData) => {
  // Implement the job processing logic here
  console.log(`Processing job: ${jobData.id}`);
};

const subscribeToJobQueue = () => {
  redis.subscribe("emailQueue", (err, count) => {
    if (err) {
      console.error("Failed to subscribe to emailQueue:", err);
    } else {
      console.log(`Subscribed to ${count} channel(s). Waiting for messages...`);
    }
  });

  redis.on("message", async (channel, message) => {
    if (channel === "emailQueue") {
      console.log(`Received message from channel ${channel}: ${message}`);
      await processJob(JSON.parse(message));
    }
  });
};

module.exports = subscribeToJobQueue;
