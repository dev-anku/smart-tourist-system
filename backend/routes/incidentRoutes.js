const express = require("express");
const router = express.Router();

const incidentController = require("../controllers/incidentController.js");
const upload = require("../config/multer.js");
const { auth, admin } = require("../middleware/auth.js");

router.post("/", upload.single("image"), incidentController.createIncident);
router.get("/", incidentController.getIncidents);

module.exports = router;
