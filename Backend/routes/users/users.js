const { Router } = require("express")
const router = Router();
const {
  getRunners,
  gerUsersById,
  updateUser,
  changePassword,
} = require("../../controllers/index");

router.get("/getrunners/:task/:location", getRunners);
router.get("/users/:id", gerUsersById);
router.patch("/users/:id", updateUser);
router.patch("/users/password/:id", changePassword);

module.exports = router