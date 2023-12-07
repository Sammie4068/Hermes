const { Router } = require("express");
const multer = require("multer");

const router = Router();
const {
  login,
  register,
  getUsers,
  tokenChecker,
  addRunner,
  getRunnerByEmail,
} = require("../../controllers/index");
const { ensureLoggedIn } = require("../../middlewares/index");

const upload = multer({ dest: "./uploads" });

router.get("/secret", ensureLoggedIn, tokenChecker);

router.get("/register", getUsers);

router.post("/register", register);

router.post("/login", login);

router.post("/runners", upload.array("image"), addRunner);

router.get("/runners/email/:email", getRunnerByEmail);
module.exports = router;