const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config({ path: "config.env" });

const sequelize = require("./util/database");

// Models
const Camera = require("./models/cameraModel");
const Network = require("./models/networkModel");

// Routes
const cameraRoutes = require("./routes/cameraRoutes");

// Starting our App
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/camera", cameraRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});

// Relationships
Network.hasMany(Camera);
Camera.belongsTo(Network);

const port = process.env.PORT || 3000;

sequelize
  .sync()
  .then(
    app.listen(port, () => {
      console.log(`App running on ${port}`);
    })
  )
  .catch((err) => console.log(err));
