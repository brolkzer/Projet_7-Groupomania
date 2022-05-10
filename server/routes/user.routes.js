const router = require("express").Router();
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("../middlewares/multer");

router.post("/jwtid", userController.fetchToken);
router.get("/:id", userController.getOneUser);
router.get("/", userController.getAllUsers);
router.get("/logout", userController.logout);
router.patch("/follow/:id", userController.followUser);
router.patch("/unfollow/:id", userController.unfollowUser);
router.patch("/bio/:id", userController.updateBio);
router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/:id", multer, uploadController.uploadProfil);
router.delete("/delete-account/:id", userController.deleteAccount);

module.exports = router;
