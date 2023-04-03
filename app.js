const express = require("express");
const path = require("path");

// Starting our App
const app = express();

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on ${port}`);
});
