const csvParser = require("csv-parser");
const fs = require("fs");

const parseCsv = (filePath) => {
  return new Promise((resolve, reject) => {
    const emails = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => emails.push(row.email)) // Assuming CSV column is 'email'
      .on("end", () => resolve(emails))
      .on("error", (err) => reject(err));
  });
};

module.exports = parseCsv;
