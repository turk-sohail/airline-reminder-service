const ticketService = require("../services/email-service");
const RabbitMQ = require("../utils/rmq");
const rabbitMQ = new RabbitMQ();

const serverConfig = require("../config/server-config");
/** */
(async function () {
  await rabbitMQ.connect();
})();

const createTicket = async (req, res) => {
  try {
    const response = await ticketService.createNotification(req.body);
    res.status(201).json({
      success: true,
      data: response,
      message: "Ticket created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "unable to create email reminder ticket",
      data: {},
    });
  }
};

const sendMessageToQueue = async (req, res) => {
  try {
    const response = await rabbitMQ.publish(
      serverConfig.BINDING_KEY,
      req.body.message
    );
    res.status(201).json({
      success: true,
      data: response,
      message: "Message sent to queue successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "unable to send message to queue",
      data: {},
    });
  }
};

const consumeMessageFromQueue = async (req, res) => {
  try {
    const response = await rabbitMQ.consume(serverConfig.BINDING_KEY, (msg) => {
      console.log(`Received: ${msg}`);
    });
    res.status(201).json({
      success: true,
      data: response,
      message: "Message consumed from queue successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "unable to consume message from queue",
      data: {},
    });
  }
};

module.exports = {
  createTicket,
  sendMessageToQueue,
  consumeMessageFromQueue,
};
