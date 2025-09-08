const express = require("express");
const router = express.Router();

const locationController = require("../controllers/locationController.js");

router.post("/", auth, locationController.updateLocation);

module.exports = router;
