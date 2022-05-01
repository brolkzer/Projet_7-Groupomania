const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./../client/public/assets/profil/");
  },
  filename: (req, file, callback) => {
    callback(null, req.params.id + ".jpg");
  },
});

module.exports = multer({ storage }).single("file");
