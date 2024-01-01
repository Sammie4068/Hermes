const { Router } = require("express");
const multer = require("multer");

const router = Router();
const {
  getRunners,
  gerUsersById,
  updateUser,
  changePassword,
  changeImage,
} = require("../../controllers/index");

const upload = multer({ dest: "./uploads" });

router.get("/getrunners/:task/:location", getRunners);
router.get("/users/:id", gerUsersById);
router.patch("/users/:id", updateUser);
router.patch("/users/password/:id", changePassword);
router.patch("/users/photo/:id", upload.single("image"), changeImage);

module.exports = router;
