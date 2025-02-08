const csvParser = require("csv-parser");
const fs = require("fs");

/**
 * Parses a CSV file and extracts valid email addresses.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<string[]>} - A promise that resolves to an array of email addresses.
 */
const parseCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const emails = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        if (row.email && typeof row.email === "string") {
          emails.push(row.email.trim().toLowerCase()); // Normalize email to lowercase
        } else {
          console.warn(`Invalid or missing email: ${JSON.stringify(row)}`);
        }
      })
      .on("end", () => resolve([...new Set(emails)])) // Ensure unique emails
      .on("error", reject);
  });
};

module.exports = parseCsv;

/*
const csvParser = require("csv-parser");
const fs = require("fs");

const parseCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const emails = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        if (row.email && typeof row.email === "string") {
          // Check if email exists and is a string
          emails.push(row.email.trim());
        } else {
          console.warn("Invalid or missing email:", row); // Log a warning for invalid email
        }
      })
      .on("end", () => resolve(emails)) // Resolve promise with emails array
      .on("error", reject); 
  });
};

module.exports = parseCsv;
*/
