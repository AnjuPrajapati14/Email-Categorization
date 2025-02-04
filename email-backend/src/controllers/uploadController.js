const fs = require("fs");
const csvParser = require("csv-parser");
const Email = require("../models/emailModel");
const { v4: uuidv4 } = require("uuid");
const emailQueue = require("../config/bullConfig");

const BATCH_SIZE = 1000; // Process 1000 emails at a time

const uploadEmails = async (req, res) => {
  const { file } = req;
  if (!file) return res.status(400).json({ error: "No file uploaded." });
  if (!file || !file.path) {
    return res
      .status(400)
      .json({ error: "No file uploaded or invalid file path." });
  }

  const requestId = uuidv4();
  let emailBatch = [];

  try {
    const stream = fs
      .createReadStream(file.path)
      .pipe(csvParser())
      .on("data", async (row) => {
        if (row.email && row.email.trim() !== "") {
          emailBatch.push(row.email.trim());
        }

        if (emailBatch.length >= BATCH_SIZE) {
          stream.pause(); // Pause to process the batch
          await insertEmailsBatch(emailBatch, requestId);
          emailBatch = [];
          stream.resume(); // Resume after processing
        }
      })

      .on("end", async () => {
        try {
          if (emailBatch.length > 0) {
            await insertEmailsBatch(emailBatch, requestId);
          }
          const job = await emailQueue.add({ requestId });
          console.log(
            `Added job to queue: ${job.id} for requestId: ${requestId}`
          );

          // emailQueue.add({ requestId });
          console.log(`Added job to queue for requestId: ${requestId}`);
          res
            .status(201)
            .json({ message: "Emails uploaded successfully.", requestId });
        } catch (error) {
          console.error("Final batch processing error:", error);
          res.status(500).json({ error: "Error finalizing email upload." });
        }
      })

      .on("error", (error) => {
        console.error("CSV parsing error:", error);
        res.status(500).json({ error: "Error processing the CSV file." });
      });
  } catch (error) {
    console.error("File processing error:", error);
    res.status(500).json({ error: "Error processing the uploaded file." });
  }
};

const insertEmailsBatch = async (emails, requestId) => {
  try {
    const uniqueEmails = Array.from(new Set(emails));
    const bulkOps = uniqueEmails.map((email) => ({
      updateOne: {
        filter: { email },
        update: { $setOnInsert: { email, requestId, status: "Pending" } },
        upsert: true,
      },
    }));

    if (bulkOps.length > 0) {
      await Email.bulkWrite(bulkOps);
    }
  } catch (error) {
    console.error("Database batch insertion error:", error);
  }
};

module.exports = uploadEmails;
