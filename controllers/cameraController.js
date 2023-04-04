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
    res.status(200).json({
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
