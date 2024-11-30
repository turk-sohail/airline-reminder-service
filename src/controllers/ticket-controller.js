const ticketService = require("../services/email-service");

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

module.exports = {
  createTicket,
};
