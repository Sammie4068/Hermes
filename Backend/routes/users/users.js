const { Router } = require("express")
const router = Router();
const {
  getRunners,
  gerUsersById,
  updateUser,
} = require("../../controllers/index");

router.get("/getrunners/:task/:location", getRunners);
router.get("/users/:id", gerUsersById);
router.patch("/users/:id", updateUser);


module.exports = router