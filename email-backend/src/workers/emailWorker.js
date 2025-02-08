const Redis = require("ioredis");
const Email = require("../models/emailModel");
 
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
  
const emailChannel = "emailQueue";
const BATCH_SIZE = 100; // Process 100 emails at a time

// Subscribe to the Redis job queue
const subscribeToJobQueue = () => {
  redis.subscribe(emailChannel, (err) => {
    if (err) {
      console.error("Failed to subscribe to channel:", err);
    } else {
      console.log(`Subscribed to ${emailChannel}. Listening for jobs...`);
    }
  });

  redis.on("message", async (channel, message) => {
    if (channel === emailChannel) {
      const { requestId } = JSON.parse(message);
      console.log(`Processing emails for requestId: ${requestId}`);

      try {
        // Fetch unprocessed emails in batches and process them
        await processEmails(requestId);
        console.log(`Job completed successfully for requestId: ${requestId}`);
      } catch (error) {
        console.error(
          `Error processing emails for requestId ${requestId}:`,
          error
        );
      }
    }
  });
};

// Function to process emails in batches
const processEmails = async (requestId) => {
  let pendingEmails = await Email.find({ requestId, status: "Pending" });

  if (!pendingEmails.length) {
    console.log("No pending emails to process.");
    return;
  }

  // Process in batches
  let batch = [];
  for (const email of pendingEmails) {
    batch.push(email);
    if (batch.length >= BATCH_SIZE) {
      await processEmailsBatch(batch);
      batch = []; // Reset batch after processing
    }
  }

  // Process any remaining emails
  if (batch.length > 0) {
    await processEmailsBatch(batch);
  }
};

// Function to process a batch of emails
const processEmailsBatch = async (emailBatch) => {
  const personalDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
    "zoho.com",
    "mail.com",
    "gmx.com",
  ];
  const bulkOps = emailBatch
    .map((email) => {
      const emailDomain = email.email.split("@")[1]?.toLowerCase();

      // Skip invalid emails
      if (!emailDomain) {
        console.log(`Invalid email format for: ${email.email}`);
        return null;
      }

      // Categorize based on domain
      const category = personalDomains.includes(emailDomain)
        ? "Personal"
        : "Work";
      console.log(`Categorizing email: ${email.email} as ${category}`); // Added log

      return {
        updateOne: {
          filter: { email: email.email },
          update: { $set: { status: "Processed", category } },
        },
      };
    })
    .filter(Boolean); // Filter out any null entries (invalid emails)

  // Perform bulk update on the database
  try {
    if (bulkOps.length) {
      await Email.bulkWrite(bulkOps);
      console.log(`Processed ${emailBatch.length} emails.`);
      // Simulated delay of 2 seconds to mimic real-world processing
      await delay(2000);
    }
  } catch (error) {
    console.error("Error processing email batch:", error);
  }
};

// Utility function for delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = subscribeToJobQueue;
