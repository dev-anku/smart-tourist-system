const Geofence = require("../models/geofence.js");
const Trip = require("../models/trip.js");
const { getIO } = require("../socket.js");

exports.updateLocation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { longitude, latitude, endTrip } = req.body;

    if (endTrip) {
      const trip = await Trip.findOneAndUpdate(
        { user: userId, endDate: null },
        { endDate: new Date() },
        { new: true },
      );

      if (!trip) return res.status(400).json({ error: "No active trip found" });
      return res.json({ success: "true", trip });
    }

    if (longitude == null || latitude == null) {
      return res.status(400).json({ error: "longitude and latitude required" });
    }

    const trip = await Trip.findOneAndUpdate(
      { user: userId, endDate: null },
      {
        user: userId,
        currentLocation: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    if (!trip.startDate) {
      trip.startDate = new Date();
      await trip.save();
    }

    const point = { type: "Point", coordinates: [longitude, latitude] };

    const geofence = await Geofence.findOne({
      geometry: {
        $geoIntersects: { $geometry: point },
      },
    });

    if (geofence) {
      const breachData = {
        geofenceId: geofence._id,
        geofenceName: geofence.name,
        userId,
        location: [longitude, latitude],
        time: new Date(),
      };
      getIO().emit("geofence-breach", breachData);
      return res.json({ breached: true, geofence: breachData });
    }

    res.json({ breached: false, geofence: null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
