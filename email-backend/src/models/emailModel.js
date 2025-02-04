const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
  },
  requestId: {
    type: String,
    required: true,
  },
  status: { type: String, enum: ["Pending", "Processed"], default: "Pending" },
  category: { type: String, enum: ["Work", "Personal"], default: null },
});

emailSchema.index({ status: 1 });
module.exports = mongoose.model("Email", emailSchema);
