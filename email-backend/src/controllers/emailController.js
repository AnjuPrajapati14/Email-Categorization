const Email = require("../models/emailModel");

// Fetch email processing statistics
const getEmailStats = async (req, res) => {
  try {
    const totalEntries = await Email.countDocuments();
    const totalProcessed = await Email.countDocuments({ status: "Processed" });
    const totalPending = await Email.countDocuments({ status: "Pending" });

    const personalEmails = await Email.countDocuments({ category: "Personal" });
    const workEmails = await Email.countDocuments({ category: "Work" });

    res.json({
      totalEntries,
      totalProcessed,
      totalPending,
      status: totalPending === 0 ? "Processing complete" : "Processing...",
      personalEmails,
      workEmails,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch email stats" });
  }
};

module.exports = { getEmailStats };

//Handles email processing & stats
