const express = require("express");
const router = express.Router();

const geofenceController = require("../controllers/geofenceController.js");

router.post("/", geofenceController.createGeofence);
router.get("/", geofenceController.getAllGeofences);
router.get("/:id", geofenceController.getGeofence);
router.delete("/:id", geofenceController.deleteGeofence);

module.exports = router;
