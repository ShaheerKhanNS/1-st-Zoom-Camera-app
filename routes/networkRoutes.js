const express = require("express");
const networkController = require("../controllers/networkController");
const router = express.Router();

router.route("/addnetwork").post(networkController.createNetwork);

module.exports = router;
