const nodeMailer = require("nodemailer");
const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASSWORD,
        },
    });
    const mailOption = {
        from: "abdulhameed000650@gmail.com",
        to: options.email,
        subject: options.subject,
        html:options.message,
    }
    await transporter.sendMail(mailOption);
    
};
module.exports = sendEmail;