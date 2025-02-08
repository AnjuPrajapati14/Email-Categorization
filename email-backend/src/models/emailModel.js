const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple regex for email validation
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  requestId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Processed"],
    default: "Pending",
  },
  category: {
    type: String,
    enum: ["Work", "Personal"],
    default: null,
  },
});

emailSchema.index({ requestId: 1, status: 1 }); // Compound index for better performance

module.exports = mongoose.model("Email", emailSchema);

/*const mongoose = require("mongoose");

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
*/
