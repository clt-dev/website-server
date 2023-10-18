const config = require('../../config/keys');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const transporter = nodemailer.createTransport(config.email);
const handlebarOptions = config.email.template;

transporter.verify(function (err) {
  if (err) {
    return console.log(err);
  }
  return console.log("Server is ready to send emails");
});

transporter.use('compile', hbs(handlebarOptions));

class EmailUtils {
    static async sendInquiryEmail(inquiry) {
        const inquiryEmail = {
            from: 'CLT Dev Inquiry <noreply@cltdev.com>',
            to: 'kylebebeau@gmail.com',
            subject: 'New Project Inquiry',
            template: 'inquiry',
            context: { 
                service: inquiry.service,
                contact: inquiry.contact,
                message: inquiry.message
            }
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(inquiryEmail, (err) => {
                if (err) {
                    console.log(err);
                    reject('Inquiry autoresponder failed to send: ', err);
                }
                resolve();
            });
        });
    }
}

module.exports = EmailUtils;