const Email = require("../models/emailModel");
const emailQueue = require("../config/bullConfig");

console.log("Email worker is running and listening for jobs...");

// Process emails from the queue
emailQueue.process(async (job, done) => {
  console.log("Processing job:", job.id);
  const { requestId } = job.data;
  console.log(`Processing job for requestId: ${requestId}`);
  if (!requestId) {
    console.error("Missing requestId in job data");
    return done(new Error("Invalid job data"));
  }

  console.log("Pending emails are left...");
  try {
    console.log("fetching the pending emails");

    // Fetch a batch of pending emails with a higher timeout
    const pendingEmails = await Email.find({ requestId, status: "Pending" })
      .maxTimeMS(30000) // Increase max time for query (e.g., 30 seconds)
      .exec(); // Ensure to execute the query

    if (pendingEmails.length === 0) {
      console.log("No pending emails to process.");
      return done();
    }

    // Process the fetched batch of emails
    for (const email of pendingEmails) {
      try {
        // Define known personal email providers
        const personalDomains = [
          "gmail.com",
          "yahoo.com",
          "outlook.com",
          "aol.com",
          "icloud.com",
          "hotmail.com",
          "protonmail.com",
          "zoho.com",
          "gmx.com",
          "mail.com",
          "yandex.com",
          "live.com",
          "me.com",
          "fastmail.com",
        ];

        // Extract domain
        const emailDomain = email.email.split("@")[1];

        // Determine category
        const category = personalDomains.includes(emailDomain)
          ? "Personal"
          : "Work";

        // Update the email record
        email.status = "Processed";
        email.category = category;
        await email.save();

        console.log(`Processed email: ${email.email} | Category: ${category}`);

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err) {
        console.error(`Error processing email: ${email.email}`, err);
      }
    }

    // Check if there are more emails to process and add a new job for the next batch
    const remainingEmails = await Email.find({
      status: "Pending",
    }).countDocuments();
    if (remainingEmails > 0) {
      console.log(
        `Remaining emails: ${remainingEmails}. Adding next batch job.`
      );
      emailQueue.add({ requestId }); // Add the next job to process the next batch
    }

    console.log("Job completed successfully.");
    done(); // Mark job as complete
  } catch (err) {
    console.error("Error fetching or processing emails:", err);
    done(err); // Mark job as failed
  }
});

module.exports = emailQueue;

/*
const Email = require("../models/emailModel");
const emailQueue = require("../config/bullConfig");

const personalDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "hotmail.com",
  "protonmail.com",
  "zoho.com",
  "gmx.com",
  "mail.com",
  "yandex.com",
  "live.com",
  "me.com",
  "fastmail.com",
];

console.log("Email worker is running and listening for jobs...");

emailQueue.process(async (job, done) => {
  const { requestId } = job.data;

  if (!requestId) {
    console.error("Missing requestId in job data");
    return done(new Error("Invalid job data"));
  }

  try {
    console.log(`Processing job for requestId: ${requestId}`);

    // Fetch a batch of pending emails for the given requestId
    const pendingEmails = await Email.find({ requestId, status: "Pending" });

    if (pendingEmails.length === 0) {
      console.log("No pending emails to process.");
      return done();
    }

    console.log(`Found ${pendingEmails.length} pending emails. Processing...`);

    // Process emails in parallel with Promise.all for better performance
    await Promise.all(pendingEmails.map(processEmail));

    // Check if there are more pending emails and schedule another job
    const remainingEmailsCount = await Email.countDocuments({
      requestId,
      status: "Pending",
    });

    if (remainingEmailsCount > 0) {
      console.log(
        `Remaining emails: ${remainingEmailsCount}. Adding next batch job.`
      );
      await emailQueue.add({ requestId });
    }

    console.log("Job completed successfully.");
    done();
  } catch (err) {
    console.error("Error processing job:", err);
    done(err); // Mark job as failed
  }
});

/**
 * Process a single email
 * @param {Object} email - Email document from MongoDB
 */
/*
async function processEmail(email) {
  try {
    const emailDomain = email.email.split("@")[1];
    const category = personalDomains.includes(emailDomain)
      ? "Personal"
      : "Work";

    email.status = "Processed";
    email.category = category;
    await email.save();

    console.log(`Processed email: ${email.email} | Category: ${category}`);

    // Simulate a delay for each email processing (optional)
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (err) {
    console.error(`Error processing email: ${email.email}`, err);
  }
}

module.exports = emailQueue;


const Email = require("../models/emailModel");
const emailQueue = require("../config/bullConfig");

console.log("Email worker is running and listening for jobs...");
// Process emails from the queue
emailQueue.process(async (job, done) => {
  console.log(" Processing job:", job.id);
  const { requestId } = job.data;
  console.log(`Processing job for requestId: ${requestId}`);
  if (!requestId) {
    console.error("Missing requestId in job data");
    return done(new Error("Invalid job data"));
  }

  console.log("Pending emails are left...");
  try {
    console.log("fetching the pending emails");
    // Fetch a batch of pending emails
    const pendingEmails = await Email.find({ requestId, status: "Pending" });

    if (pendingEmails.length === 0) {
      console.log("No pending emails to process.");
      return done();
    }
    // Process the fetched batch of emails
    for (const email of pendingEmails) {
      try {
        // Define known personal email providers
        const personalDomains = [
          "gmail.com",
          "yahoo.com",
          "outlook.com",
          "aol.com",
          "icloud.com",
          "hotmail.com",
          "protonmail.com",
          "zoho.com",
          "gmx.com",
          "mail.com",
          "yandex.com",
          "live.com",
          "me.com",
          "fastmail.com",
        ];

        // Extract domain
        const emailDomain = email.email.split("@")[1];

        // Determine category
        const category = personalDomains.includes(emailDomain)
          ? "Personal"
          : "Work";

        // Update the email record
        email.status = "Processed";
        email.category = category;
        await email.save();

        console.log(`Processed email: ${email.email} | Category: ${category}`);

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err) {
        console.error(`Error processing email: ${email.email}`, err);
      }
    }

    // Check if there are more emails to process and add a new job for the next batch
    const remainingEmails = await Email.find({
      status: "Pending",
    }).countDocuments();
    if (remainingEmails > 0) {
      console.log(
        `Remaining emails: ${remainingEmails}. Adding next batch job.`
      );
      emailQueue.add({ requestId }); // Add the next job to process the next batch
    }

    console.log("Job completed successfully.");
    done(); // Mark job as complete
  } catch (err) {
    console.error("Error fetching or processing emails:", err);
    done(err); // Mark job as failed
  }
});

module.exports = emailQueue;
*/
