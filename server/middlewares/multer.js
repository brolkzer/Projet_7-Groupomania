const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./../client/public/assets/profil/");
  },
  filename: (req, file, callback) => {
    callback(null, req.params.id + ".jpg");
  },
});

module.exports = multer({ storage }).single("file");
