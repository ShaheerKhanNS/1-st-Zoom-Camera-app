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
