const Geofence = require("../models/geofence.js");
const Trip = require("../models/trip.js");
const { getIO } = require("../socket.js");

exports.updateLocation = async (req, res) => {
  try {
    const { userId, longitude, latitude } = req.body;

    const trip = await Trip.findOneAndUpdate(
      { user: userId, endDate: null },
      {
        user: userId,
        currentLocation: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        startDate: new Date(),
      },
      { new: true, upsert: true },
    );

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
