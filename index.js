const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { sendBasicEmail } = require("./src/services/email-service");
const { serverConfig } = require("./src/config");
const cron = require("node-cron");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const start = async () => {
  app.listen(serverConfig.PORT, () => {
    sendBasicEmail(
      "turk@turk.com",
      "sohailsarwarkhan18@gmail.com",
      "hallo",
      "wa na karo"
    );

    cron.schedule("0 15 * * *", () => {
      console.log("running a task every minute");
    });
    console.log("Server is running on port", serverConfig.PORT);
  });
};

start();
