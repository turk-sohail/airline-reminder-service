const { Op } = require("sequelize");
const { NotificationTicket } = require("../models");

const fetchPendingEmails = async () => {
  try {
    const pendingEmails = await NotificationTicket.findAll({
      where: {
        status: "PENDING",
      },
    });
    return pendingEmails;
  } catch (error) {
    throw error;
  }
};

const createNotification = async (data) => {
  try {
    const notification = await NotificationTicket.create(data);
    return notification;
  } catch (error) {
    throw error;
  }
};

async function get(filter) {
  try {
    const tickets = await NotificationTicket.findAll({
      where: {
        status: filter.status,
        notificationTime: {
          [Op.lte]: new Date(),
        },
      },
    });
    return tickets;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateNotification(id, data) {
  try {
    const notification = await NotificationTicket.update(data, {
      where: {
        id: id,
      },
    });
    return notification;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  fetchPendingEmails,
  createNotification,
  get,
  updateNotification,
};
