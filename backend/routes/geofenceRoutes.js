const express = require("express");
const router = express.Router();

const geofenceController = require("../controllers/geofenceController.js");
const { auth, admin } = require("../middleware/auth.js");

router.post("/", auth, admin, geofenceController.createGeofence);
router.get("/", auth, geofenceController.getAllGeofences);
router.get("/:id", auth, admin, geofenceController.getGeofence);
router.delete("/:id", auth, admin, geofenceController.deleteGeofence);

module.exports = router;
