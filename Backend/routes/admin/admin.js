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
  addTransaction,
  updateWallet,
  getTransactions,
  addToWallet,
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
router.post("/transaction", addTransaction);
router.get("/transaction/:id", getTransactions);
router.patch("/users/wallet", updateWallet);
router.patch("/users/wallet/reward", addToWallet);

module.exports = router;
