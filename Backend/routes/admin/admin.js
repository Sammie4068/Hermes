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
  getRunnerActivity,
  getActivityBySetterID,
  updateStatus,
} = require("../../controllers/index");

router.get("/tasks", getTasks);
router.get("/tasks/:title", getNameTask);
router.get("/runners", getAllRunners);
router.post("/activity", addActivity);
router.patch("/activity/runner/:id", updateRunnerID);
router.patch("/activity/status/:id", updateStatus);
router.get("/activity/:id", getUserActivity);
router.get("/activity/id/:id", getActivityByID);
router.get("/activity/runner/:id", getRunnerActivity);
router.get("/activity/setter/:id", getActivityBySetterID);


module.exports = router;
