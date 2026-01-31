const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    isLive: {
      type: Boolean,
      default: true, // true = visible, false = hidden
    },
    postedBy: {
      type: String,
      default: "Admin",
    },
    views: {
      type: Number,
      default: 0, // tracks views
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
