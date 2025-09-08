const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  currentLocation: {
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
});

module.exports = mongoose.model("Trip", TripSchema);
