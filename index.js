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
const rmq = require("./src/utils/rmq");
const rabbitMQ = new rmq();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/v1/tickets", ticketController.createTicket);

/**
 * test
 *
 */

app.post("/api/v1/publish", ticketController.sendMessageToQueue);
app.get("/api/v1/consume", ticketController.consumeMessageFromQueue);

const start = async () => {
  //jobs();
  await rabbitMQ.connect();
  await rabbitMQ.consume(serverConfig.BINDING_KEY);

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
