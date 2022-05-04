const router = require("express").Router();
const commentController = require("../controllers/comment.controller");
const userModChecker = require("../middlewares/userModChecker");

router.get("/", commentController.getComments);
router.get("/:id", commentController.getComment);
router.post("/:id", commentController.createComment);
router.patch("/:id", userModChecker, commentController.updateComment);
router.delete("/:id", userModChecker, commentController.deleteComment);

module.exports = router;
