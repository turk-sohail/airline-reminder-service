const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_ID: process.env.EMAIL_ID,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  BINDING_KEY: process.env.BINDING_KEY,
  QUEUE_NAME: process.env.QUEUE_NAME,
};
