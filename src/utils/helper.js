app.post("/publish", async (req, res) => {
  const { routingKey, message } = req.body;
  if (!routingKey || !message) {
    return res.status(400).send("Routing key and message are required.");
  }

  try {
    await rabbitMQ.publish(routingKey, message);
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending message.");
  }
});

app.get("/consume/:routingKey", async (req, res) => {
  const routingKey = req.params.routingKey;

  try {
    await rabbitMQ.consume(routingKey, (msg) => {
      console.log(`Received: ${msg}`);
      // Here you can process the message as needed
    });
    res
      .status(200)
      .send(`Started consuming messages with routing key: ${routingKey}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error consuming messages.");
  }
});
