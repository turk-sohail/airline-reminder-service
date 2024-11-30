const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { sendBasicEmail } = require("./src/services/email-service");
const { serverConfig } = require("./src/config");
const cron = require("node-cron");
const jobs = require("./src/utils/jobs");
const db = require("./src/models");
const { NotificationTicket } = require("./src/models");
const ticketController = require("./src/controllers/ticket-controller");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/v1/tickets", ticketController.createTicket);

const start = async () => {
  jobs();

  app.listen(serverConfig.PORT, () => {
    //db.sequelize.sync({ alter: true });
    // sendBasicEmail(
    //   "turk@turk.com",
    //   "sohailsarwarkhan18@gmail.com",
    //   "hallo",
    //   "wa na karo"
    // );

    console.log("Server is running on port", serverConfig.PORT);
  });
};

start();
