const express = require("express");
const cameraContoller = require("../controllers/cameraController");

const router = express.Router();

router.route("/addcamera").post(cameraContoller.addCamera);
router.route("/getcameras").get(cameraContoller.getAllCameras);
router.route("/deletecamera/:id").delete(cameraContoller.deleteCamera);

module.exports = router;
