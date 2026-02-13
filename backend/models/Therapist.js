const mongoose = require("mongoose");

const therapistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },

    contact: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    additionalInformation: {
      type: String,
      default: "",
    },
    practicingDetails: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },

    // ⭐ ADD THIS PART
 likesCount: {
  type: Number,
  default: 0
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("Therapist", therapistSchema);
