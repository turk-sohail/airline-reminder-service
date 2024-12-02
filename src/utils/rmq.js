// rabbitmq.js
const amqp = require("amqplib");
const serverConfig = require("../config/server-config");
const RABBITMQ_URL = serverConfig.RABBITMQ_URL;
const EXCHANGE_NAME = serverConfig.EXCHANGE_NAME;
const QUEUE_NAME = serverConfig.QUEUE_NAME;
const emailService = require("../services/email-service");

class RabbitMQ {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.exchange = EXCHANGE_NAME;
  }

  async connect() {
    this.connection = await amqp.connect(RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(EXCHANGE_NAME, "direct", {
      durable: true,
    });
  }

  async publish(routingKey, message) {
    this.channel.sendToQueue(QUEUE_NAME, Buffer.from(message), () => {});
    console.log(`Sent: ${message} with routingKey: ${routingKey}`);
  }

  async consume(routingKey /*callback*/) {
    const queue = await this.channel.assertQueue(QUEUE_NAME);

    await this.channel.bindQueue(queue.queue, this.exchange, routingKey);

    this.channel.consume(queue.queue, async (msg) => {
      if (msg !== null) {
        // callback(msg.content.toString());
        // this.channel.ack(msg);
        await emailService.createNotification(
          JSON.parse(msg.content.toString())
        ); // msg.content.toString());
        this.channel.ack(msg);
      }
    });
  }
}

module.exports = RabbitMQ;
