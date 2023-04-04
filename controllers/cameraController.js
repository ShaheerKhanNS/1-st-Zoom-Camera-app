const Camera = require("../models/cameraModel");

exports.addCamera = async (req, res) => {
  try {
    const { name, description, url } = req.body;
    console.log(name, description, url);
    await Camera.create({
      name,
      description,
      url,
    });
    res.status(201).json({
      status: "success",
      message: "Successfully added camera",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
    throw new Error(err);
  }
};

exports.getAllCameras = async (req, res) => {
  try {
    const cameras = await Camera.findAll({
      attributes: ["id", "name", "description", "url"],
    });

    res.status(200).json({
      status: "success",
      cameras,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.deleteCamera = async (req, res) => {
  try {
    const id = req.params.id;
    const camera = Camera.destroy({
      where: {
        id,
      },
    });

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err,
    });
  }
};
