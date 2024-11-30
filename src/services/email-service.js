const sender = require("../config/email-config");
const ticketRepository = require("../repository/ticket-repository");

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
  sender.sendMail({
    from: mailFrom,
    to: mailTo,
    subject: mailSubject,
    html: mailBody,
  });
};

const findAllPendingEmails = async (timestamp) => {
  try {
    const notificationTickets = await ticketRepository.get({
      status: "PENDING",
    });
    return notificationTickets;
  } catch (error) {
    throw error;
  }
};

const createNotification = async (data) => {
  try {
    const notification = await ticketRepository.createNotification(data);
    return notification;
  } catch (error) {
    throw error;
  }
};

const updateTicket = async (id, data) => {
  try {
    const notification = await ticketRepository.updateNotification(id, data);
    return notification;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sendBasicEmail,
  findAllPendingEmails,
  createNotification,
  updateTicket,
};
