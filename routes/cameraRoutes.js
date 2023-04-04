const express = require("express");
const cameraContoller = require("../controllers/cameraController");

const router = express.Router();

router.route("/addcamera").post(cameraContoller.addCamera);

module.exports = router;
