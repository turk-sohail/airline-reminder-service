// const amqplib = require("amqplib");

// let channel;
// async function createChannel() {
//   try {
//     const connection = await amqplib.connect(RABBITMQ_URL);
//     channel = await connection.createChannel();
//     channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
//     // return channel;
//   } catch (error) {
//     throw error;
//   }
// }

// async function subscribeMessage(channel, service, bindingKey) {
//   const applicationQueue = await channel.assertQueue(QUEUE_NAME);
//   channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, bindingKey);
//   channel.consume(applicationQueue.queue, (message) => {
//     if (message !== null) {
//       const msg = JSON.parse(message.content.toString());
//       service(msg);
//       channel.ack(message);
//     }
//   });
// }

// const publishMessage = async (channel, bindingKey, message) => {
//   try {
//     await channel.assertQueue(QUEUE_NAME);
//     await channel.publish(
//       EXCHANGE_NAME,
//       bindingKey,
//       Buffer.from(JSON.stringify(message))
//     );
//   } catch (error) {
//     throw error;
//   }
// };

// module.exports = {
//   subscribeMessage,
//   createChannel,
// };
