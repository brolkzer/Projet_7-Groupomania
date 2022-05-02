const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multerPost = require("../middlewares/multerPost");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.patch("/update-content/:id", postController.updatePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);
router.post("/:id", multerPost, postController.createPost);
router.delete("/:id", postController.deletePost);

module.exports = router;
