const User = require("../models/User");

module.exports.uploadProfil = async (req, res) => {
  try {
    const userUpload = await User.findOne({ where: { id: req.params.id } });
    userUpload.picture = req.body.imgString;
    await userUpload.save();

    return res.status(200).json("Votre photo de profil a été modifiée");
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error:
        "Erreur lors de la tentative de changement de photo de profil" + err,
    });
  }
};
