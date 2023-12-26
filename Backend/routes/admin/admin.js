const { Router } = require("express");
const router = Router();
const {
  getNameTask,
  getTasks,
  getAllRunners,
  addActivity,
  updateRunnerID,
  getUserActivity,
} = require("../../controllers/index");

router.get("/tasks", getTasks);
router.get("/tasks/:title", getNameTask);
router.get("/runners", getAllRunners);
router.post("/activity", addActivity);
router.patch("/activity/runner/:id", updateRunnerID);
router.get("/activity/:id", getUserActivity);

module.exports = router;
