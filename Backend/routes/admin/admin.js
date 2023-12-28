const { Router } = require("express");
const router = Router();
const {
  getNameTask,
  getTasks,
  getAllRunners,
  addActivity,
  updateRunnerID,
  getUserActivity,
  getActivityByID,
} = require("../../controllers/index");

router.get("/tasks", getTasks);
router.get("/tasks/:title", getNameTask);
router.get("/runners", getAllRunners);
router.post("/activity", addActivity);
router.patch("/activity/runner/:id", updateRunnerID);
router.get("/activity/:id", getUserActivity);
router.get("/activity/id/:id", getActivityByID);

module.exports = router;
