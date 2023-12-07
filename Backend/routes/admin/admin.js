const { Router } = require("express");
const router = Router();
const {
  getNameTask,
  getTasks,
  getAllRunners,
} = require("../../controllers/index");

router.get("/tasks", getTasks);
router.get("/tasks/:title", getNameTask);
router.get("/runners", getAllRunners);

module.exports = router;
