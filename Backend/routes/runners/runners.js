const { Router } = require("express");
const router = Router();
const multer = require("multer");

const { addRunner, getRunnerByEmail } = require("../../controllers/index");
const upload = multer({ dest: "./uploads" });

router.post("/runners", upload.array("image"), addRunner);
router.get("/runners/email/:email", getRunnerByEmail);

module.exports = router;
