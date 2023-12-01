const { Router } = require("express")
const router = Router();
const {getRunners} = require("../../controllers/index")

router.get("/getrunners/:task/:location", getRunners);

module.exports = router