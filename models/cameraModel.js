const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Camera = sequelize.define("camera", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  isAvailable: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Camera;
