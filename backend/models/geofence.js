const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeofenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  geometry: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true,
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0 && arr[0].length >= 4,
        message:
          "Polygon must have at least 4 points (first and last point must be same)",
      },
    },
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

GeofenceSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model("Geofence", GeofenceSchema);
