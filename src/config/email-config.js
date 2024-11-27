const nodemailer = require("nodemailer");
const serverConfig = require("./server-config");

const sender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: serverConfig.EMAIL_ID,
    pass: serverConfig.EMAIL_PASSWORD,
  },
});

module.exports = sender;
