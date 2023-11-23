const { Router } = require("express")
const router = Router()
const { getNameTask, getTasks } = require("../../controllers/index");


router.get("/tasks", getTasks)
router.get("/tasks/:title", getNameTask)

module.exports = router;