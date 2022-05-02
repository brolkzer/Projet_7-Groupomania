const router = require("express").Router();
const commentController = require("../controllers/comment.controller");

router.get("/", commentController.getComments);
router.get("/:id", commentController.getComment);
router.post("/:id", commentController.createComment);
router.patch("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
