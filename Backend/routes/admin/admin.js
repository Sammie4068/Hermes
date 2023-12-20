const { Router } = require("express");
const router = Router();
const {
  getNameTask,
  getTasks,
  getAllRunners,
  addActivity,
} = require("../../controllers/index");

router.get("/tasks", getTasks);
router.get("/tasks/:title", getNameTask);
router.get("/runners", getAllRunners);
router.post("/activity", addActivity);

module.exports = router;
