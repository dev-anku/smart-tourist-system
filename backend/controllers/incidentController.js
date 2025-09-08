const Incident = require("../models/incident.js");
const crypto = require("crypto");

exports.createIncident = async (req, res) => {
  try {
    const { reporter, longitude, latitude, description, time } = req.body;

    if (!reporter || !description || !longitude || !latitude || !req.file) {
      return res
        .status(400)
        .json({ error: "reporter, location and image required" });
    }

    const image = req.file.path;

    const evidenceHash = crypto
      .createHash("sha256")
      .update(reporter + time + image)
      .digest("hex");

    const incident = new Incident({
      reporter,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      description,
      time,
      image,
      evidenceHash,
    });

    await incident.save();

    // emit socket event to responders here

    res.status(201).json({ message: "Incident created", incident });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate("reporter", "name email");
    res.json(incidents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
