const Network = require("../models/networkModel");
const Camera = require("../models/cameraModel");

exports.createNetwork = async (req, res) => {
  try {
    const { name, description, url } = req.body;

    await Network.create({
      name,
      description,
      url,
    });
    res.status(201).json({
      status: "success",
      message: "Successfully added network",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      err,
    });
  }
};

exports.getNetworks = async (req, res) => {
  try {
    const networks = await Network.findAll({
      attributes: ["id", "name", "description", "url"],
      include: [
        {
          model: Camera,
          attributes: ["name", "description"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      networks,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      err,
    });
  }
};

exports.addCameraToNetwork = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.params.id;

    // Check whether the camera is available or not

    const camera = await Camera.findOne({
      where: {
        name,
      },
    });

    if (!camera && camera.isAvailable === false) {
      res.status(404).json({
        status: "fail",
        message: "Camera is not available",
      });
    } else {
      camera.set({
        isAvailable: false,
        networkId: id,
      });
      await camera.save();
      res.status(201).json({
        status: "success",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "SomethingWent wrong",
    });
  }
};
