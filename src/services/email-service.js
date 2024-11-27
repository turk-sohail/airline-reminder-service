const sender = require("../config/email-config");

const sendBasicEmail = (mailFrom, mailTo, mailSubject, mailBody) => {
  sender.sendMail({
    from: mailFrom,
    to: mailTo,
    subject: mailSubject,
    html: mailBody,
  });
};

module.exports = {
  sendBasicEmail,
};
