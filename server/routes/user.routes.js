const router = require("express").Router();
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.get("/", userController.getAllUsers);
router.post("/jwtid", userController.fetchToken);
router.get("/:id", userController.getOneUser);
router.get("/logout", userController.logout);
router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);

module.exports = router;
