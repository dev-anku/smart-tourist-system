const Incident = require("../models/incident.js");
const crypto = require("crypto");
const { getIO } = require("../socket.js");

exports.createIncident = async (req, res) => {
  try {
    const { longitude, latitude, description, time } = req.body;

    if (!description || !longitude || !latitude || !req.file) {
      return res
        .status(400)
        .json({ error: "description, location and image required" });
    }

    const image = req.file.path;

    const evidenceHash = crypto
      .createHash("sha256")
      .update(reporter + time + image)
      .digest("hex");

    const incident = new Incident({
      reporter: req.user._id,
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

    const tx = await digitalID.fileComplaint(
      req.user._id.toString(),
      [longitude, latitude],
      description,
      evidenceHash,
    );
    await tx.wait();

    getIO().emit("new-incident", incident);

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
