const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const Email = require("../models/emailModel");
const parseCsv = require("../utils/csvParser");
const redisClient = require("../config/redis");

const BATCH_SIZE = 1000;

/**
 * Uploads emails from a CSV file and initiates processing.
 */
const uploadEmails = async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({
      error:
        "No file uploaded. Please ensure the file is a CSV and less than 30MB.",
    });
  }
  if (!file.path) {
    return res.status(400).json({ error: "Invalid file path." });
  }

  const requestId = uuidv4();

  try {
    const emails = await parseCsv(file.path);
    if (!emails.length) {
      return res
        .status(400)
        .json({ error: "The uploaded CSV is empty or has an invalid format." });
    }
    await insertEmailsInBatches(emails, requestId);

    // Publish the requestId to the emailQueue channel
    await redisClient.publish("emailQueue", JSON.stringify({ requestId }));

    res
      .status(201)
      .json({ message: "Emails uploaded successfully.", requestId });
  } catch (error) {
    console.error("Error during email upload:", error);
    res.status(500).json({ error: "Error processing the uploaded file." });
  } finally {
    fs.unlink(file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }
};

/**
 * Inserts emails into the database in batches.
 */
const insertEmailsInBatches = async (emails, requestId) => {
  try {
    for (let i = 0; i < emails.length; i += BATCH_SIZE) {
      const batch = emails.slice(i, i + BATCH_SIZE);
      const bulkOps = batch.map((email) => ({
        updateOne: {
          filter: { email },
          update: { $setOnInsert: { email, requestId, status: "Pending" } },
          upsert: true,
        },
      }));
      if (bulkOps.length) await Email.bulkWrite(bulkOps);
      // After every batch, immediately publish the requestId for background processing
      await redisClient.publish("emailQueue", JSON.stringify({ requestId }));
    }
  } catch (error) {
    console.error("Error inserting emails:", error);
  }
};

module.exports = { uploadEmails };
