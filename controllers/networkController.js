const Network = require("../models/networkModel");

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
