
const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      trim: true,
      default: "",
      maxlength: 25,
    },

    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: 100,
    },

    status: {
      type: String,
      enum: ["Lead", "Prospect", "Customer"],
      default: "Lead",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

schema.index({ owner: 1, createdAt: -1 });

module.exports = mongoose.model("Customer", schema);
