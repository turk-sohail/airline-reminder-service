const nodeCron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/email-config");
function jobs() {
  nodeCron.schedule("*/1 * * * *", async () => {
    const response = await emailService.findAllPendingEmails();
    response.forEach((ticket) => {
      sender.sendMail(
        {
          to: ticket.recipientEmail,
          subject: ticket.subject,
          html: ticket.contents,
        },
        (error, data) => {
          if (error) {
            console.log(error);
          } else {
            emailService.updateTicket(ticket.id, { status: "SUCCESS" });
            console.log(data);
          }
        }
      );
    });
    console.log("Emails sent successfully");
  });
}

module.exports = jobs;
