const Geofence = require("../models/geofence.js");

exports.createGeofence = async (req, res) => {
  try {
    const { name, coordinates } = req.body;

    if (!name || !coordinates || !Array.isArray(coordinates)) {
      return res
        .status(400)
        .json({ error: "Name and valid coordinates required" });
    }

    const geofence = new Geofence({
      name,
      geometry: {
        type: "Polygon",
        coordinates: [coordinates],
      },
      createdBy: req.user._id,
    });

    await geofence.save();
    res.status(201).json({ message: "Geofence created", geofence });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllGeofences = async (req, res) => {
  try {
    const geofences = await Geofence.find().populate("createdBy", "name email");
    res.json(geofences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getGeofence = async (req, res) => {
  try {
    const geofence = await Geofence.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );
    if (!geofence) return res.status(404).json({ error: "Geofence not found" });
    res.json(geofence);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGeofence = async (req, res) => {
  try {
    const geofence = await Geofence.findByIdAndDelete(req.params.id);
    if (!geofence) return res.status(404).json({ error: "Geofence not found" });
    res.json({ message: "Geofence deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
