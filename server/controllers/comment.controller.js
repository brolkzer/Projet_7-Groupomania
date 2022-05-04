const Comment = require("../models/Comment");

module.exports.getComments = async (req, res) => {
  Comment.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json(err));
};

module.exports.getComment = async (req, res) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json(err));
};

module.exports.createComment = async (req, res) => {
  Comment.create({
    commenterId: req.params.id,
    content: req.body.content,
    postId: req.body.postId,
  })
    .then((comment) => res.status(200).json("Commentaire crée ! "))
    .catch((err) =>
      res
        .status(500)
        .json("Erreur lors de la tentative de création d'un commentaire " + err)
    );
};

module.exports.updateComment = async (req, res) => {
  try {
    const commentUpdate = await Comment.findOne({
      where: { id: req.params.id },
    });
    commentUpdate.content = req.body.content;
    await commentUpdate.save();

    return res.status(200).json("Votre commentaire à été modifié !");
  } catch (err) {
    return res.status(500).json({
      error: "Erreur lors de la tentative de modification du commentaire" + err,
    });
  }
};

module.exports.deleteComment = async (req, res) => {
  Comment.destroy({
    where: { id: req.params.id },
  })
    .then(() => res.status(203).json("Le commentaire a bien été supprimé"))
    .catch((err) =>
      res.status(500).json({
        error:
          "Erreur lors de la tentative de suppression du commentaire" + err,
      })
    );
};
