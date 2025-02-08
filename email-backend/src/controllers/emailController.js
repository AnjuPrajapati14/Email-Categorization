const Email = require("../models/emailModel");

/**
 * Fetches email processing statistics.
 */
const getEmailStats = async (req, res) => {
  try {
    const [
      totalEntries,
      totalProcessed,
      totalPending,
      personalEmails,
      workEmails,
    ] = await Promise.all([
      Email.countDocuments(),
      Email.countDocuments({ status: "Processed" }),
      Email.countDocuments({ status: "Pending" }),
      Email.countDocuments({ category: "Personal" }),
      Email.countDocuments({ category: "Work" }),
    ]);

    res.json({
      totalEntries,
      totalProcessed,
      totalPending,
      status: totalPending === 0 ? "Processing complete" : "Processing...",
      personalEmails,
      workEmails,
    });
  } catch (error) {
    console.error("Error fetching email stats:", error);
    res.status(500).json({ error: "Failed to fetch email stats" });
  }
};

module.exports = { getEmailStats };
