const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "incidents",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 1024, height: 1024, crop: "limit" }],
  },
});

const upload = multer({ storage });

module.exports = upload;
