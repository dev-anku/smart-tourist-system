const express = require("express");
const router = express.Router();

const locationController = require("../controllers/locationController.js");

router.post("/", locationController.updateLocation);

module.exports = router;
