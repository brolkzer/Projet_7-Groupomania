const Post = require("../models/Post");
const Comment = require("../models/Comment");
const fs = require("fs");

module.exports.getPosts = async (req, res) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json(err));
};

module.exports.getPost = async (req, res) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json(err));
};

module.exports.updatePost = async (req, res) => {
  try {
    const postContent = await Post.findOne({ where: { id: req.params.id } });
    postContent.content = req.body.content;
    await postContent.save();

    return res.status(200).json("Post modifié");
  } catch (err) {
    return res.status(500).json({
      error: "Erreur lors de la tentative de modification du post" + err,
    });
  }
};

module.exports.createPost = async (req, res) => {
  Post.create({
    posterId: req.body.posterId,
    content: req.body.message,
    video: req.body.video,
    picture: req.body.imgString,
  })
    .then(() => res.status(200).json("post crée"))
    .catch((err) => console.log(err));
};

module.exports.deletePost = async (req, res) => {
  try {
    const getPost = await Post.findOne({ where: { id: req.params.id } });
    if (getPost.picture != null)
      fs.unlink(
        `../client/public/assets/postsUploads/${getPost.picture.split("/")[3]}`,
        (err) => {
          if (err) throw err;
        }
      );
    const postDelete = await Post.destroy({ where: { id: req.params.id } });
    postDelete;
    const commentDelete = await Comment.destroy({
      where: { postId: req.params.id },
    });
    commentDelete;

    return res.status(200).json("post bien supprimé");
  } catch (err) {
    return res.status(500).json("erreur lors du delete post" + err);
  }
};

module.exports.likePost = async (req, res) => {
  try {
    const postLiking = await Post.findOne({ where: { id: req.params.id } });
    postLiking.likes += req.body.id;
    await postLiking.save();

    return res.status(200).json("Post liké ");
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la tentative de like" + err });
  }
};

module.exports.unlikePost = async (req, res) => {
  try {
    const postUnliking = await Post.findOne({
      where: { id: req.params.id },
    });
    const postUnlikingArray = postUnliking.likes.match(/.{1,36}/g);
    const postUnlikingArrayFiltered = postUnlikingArray.filter(
      (id) => id != req.body.id
    );
    const postUnlikingStrings = postUnlikingArrayFiltered.join("");
    postUnliking.likes = postUnlikingStrings;
    await postUnliking.save();

    return res.status(200).json("Vous n'aimez plus ce post ! ");
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Erreur lors de la tentative d'unlike" + err });
  }
};
