const mongoose = require("mongoose");
 
 const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    textContent: {
      type: String,
      required: true, // TipTap JSON
    },
    likes: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
 
 
module.exports = mongoose.model("Blog", blogSchema);