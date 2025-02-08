const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.name}: ${err.message}`);

  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ error: "Validation Error", details: err.message });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format." });
  }

  // Handle other errors (optional: check for specific HTTP errors)
  res.status(err.status || 500).json({
    error: "Something went wrong. Please try again later.",
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
