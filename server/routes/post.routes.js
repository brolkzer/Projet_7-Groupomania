const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multerPost = require("../middlewares/multerPost");
const userModChecker = require("../middlewares/userModChecker");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.patch("/update-content/:id", userModChecker, postController.updatePost);
router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);
router.post("/addPost/:id", multerPost, postController.createPost);
router.delete("/:id", userModChecker, postController.deletePost);

module.exports = router;
