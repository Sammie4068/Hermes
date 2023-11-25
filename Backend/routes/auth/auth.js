const { Router } = require("express");
const router = Router();
const {
  login,
  register,
  getUsers,
  tokenChecker,
} = require("../../controllers/index");
const { ensureLoggedIn } = require("../../middlewares/index");

router.get("/secret", ensureLoggedIn, tokenChecker);

router.get("/register", getUsers);

router.post("/register", register);

router.post("/login", login);

module.exports = router;