const express = require("express");
const multer = require("multer");
const uploadEmails = require("../controllers/uploadController");
const getStatus = require("../controllers/statusController");
const { getEmailStats } = require("../controllers/emailController");
// Configure multer for file uploads
const upload = multer({
  dest: "uploads/", // Directory to store the uploaded files temporarily
  limits: { fileSize: 30 * 1024 * 1024 }, // Limit file size to 30MB
  fileFilter: (req, file, cb) => {
    // Only allow CSV files
    if (!file.originalname.match(/\.(csv)$/)) {
      return cb(new Error("Only CSV files are allowed!"), false);
    }
    cb(null, true);
  },
});

const router = express.Router();

// Routes

// POST route for file upload
router.post("/upload", upload.single("file"), uploadEmails);

// GET route for checking the status of email processing
router.get("/status/:requestId", getStatus);

// Fetch email processing statistics
router.get("/email-stats", getEmailStats);

// Error handling middleware for multer-related issues (e.g., file type or size)
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific error
    return res.status(400).json({ error: err.message });
  }
  if (err) {
    // General error handling
    return res.status(400).json({ error: err.message });
  }
  next();
});

module.exports = router;
