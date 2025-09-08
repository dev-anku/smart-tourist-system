const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IncidentSchema = new Schema({
  reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (arr) => arr.length === 2,
        message: "Coordinates must be [lng, lat].",
      },
    },
  },
  time: { type: Date, required: true },
  image: { type: String, required: true },
  assignedResponder: { type: Schema.Types.ObjectId, ref: "User" },
  onChainHash: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Incident", IncidentSchema);
