const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.post("/sign-up", userController.signUp);

module.exports = router;
