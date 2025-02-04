const Email = require("../models/emailModel");

const getStatus = async (req, res) => {
  const { requestId } = req.params;

  if (!requestId) {
    return res.status(400).json({ error: "Request ID is required." });
  }

  try {
    // Aggregate email stats for the specific requestId
    const stats = await Email.aggregate([
      { $match: { requestId: requestId.toString() } }, // Ensure filtering by requestId
      {
        $group: {
          _id: "$requestId",
          totalEntries: { $sum: 1 },
          totalProcessed: {
            $sum: { $cond: [{ $eq: ["$status", "Processed"] }, 1, 0] },
          },
          totalPending: {
            $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] },
          },
          personalEmails: {
            $sum: { $cond: [{ $eq: ["$category", "Personal"] }, 1, 0] },
          },
          workEmails: {
            $sum: { $cond: [{ $eq: ["$category", "Work"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          requestId: "$_id",
          totalEntries: 1,
          totalProcessed: 1,
          totalPending: 1,
          personalEmails: 1,
          workEmails: 1,
          status: {
            $cond: [
              { $eq: ["$totalPending", 0] },
              "Processing complete",
              "Processing...",
            ],
          },
        },
      },
    ]);

    if (!stats.length) {
      return res.status(404).json({
        requestId,
        message: "No data found for this requestId.",
      });
    }

    res.status(200).json(stats[0]); // Return the specific requestId's data
  } catch (error) {
    console.error("Error fetching status:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the status." });
  }
};

module.exports = getStatus;
 