const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    audienceSegment: {
      type: Object, // JSON query object
      required: true,
    },
    audienceSize: {
      type: Number,
      default: 0,
    },
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
    ],
    communicationLog: [
      {
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
        message: { type: String },
        status: {
          type: String,
          enum: ["SENT", "FAILED", "PENDING"],
          default: "PENDING",
        },
        deliveryReceiptTimestamp: { type: Date },
        lastUpdated: { type: Date, default: Date.now },
      },
    ],
    stats: {
      sent: { type: Number, default: 0 },
      failed: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Campaign", campaignSchema);
