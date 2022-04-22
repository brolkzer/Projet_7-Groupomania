const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.get("/logout", userController.logout);
router.patch("/follow/:id", userController.followUser);
router.patch("/unfollow/:id", userController.unfollowUser);
router.post("/jwtid", userController.fetchToken);
router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);

module.exports = router;
