const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  currentLocation: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
});

module.exports = mongoose.model("Trip", TripSchema);
