const express = require("express");
const app = express();
const serverConfig = require("./config/server-config");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const start = async () => {
  app.listen(serverConfig.port, () => {
    console.log("Server is running on port", serverConfig.port);
  });
};
