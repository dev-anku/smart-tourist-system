const Geofence = require("../models/geofence.js");
const Trip = require("../models/trip.js");

exports.updateLocation = async (req, res) => {
  try {
    const { userId, longitude, latitude } = req.body;

    const trip = await Trip.findOneAndUpdate(
      { user: userId, endDate: null },
      {
        currentLocation: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
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
      return res.json({ insideGeofence: true, geofence });
    }

    res.json({ insideGeofence: false, geofence: null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
