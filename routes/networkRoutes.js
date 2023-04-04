const express = require("express");
const networkController = require("../controllers/networkController");
const router = express.Router();

router.route("/addnetwork").post(networkController.createNetwork);
router.route("/getnetworks").get(networkController.getNetworks);

module.exports = router;
