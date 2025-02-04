// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(err.stack);

  // Handle specific error codes
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  // Return generic server error if no specific handler found
  res.status(500).json({
    error: "Something went wrong. Please try again later.",
  });
};

module.exports = errorHandler;
