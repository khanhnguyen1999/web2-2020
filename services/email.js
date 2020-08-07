const nodemailer = require("nodemailer");

async function send(to, subject, content) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 25,
        secure: false,
        pool: true,
        auth: {
            user: process.env.EMAIL_USER || "1760079web2@gmail.com",
            pass: process.env.EMAIL_PASSWORD || "khai123456",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    transporter.sendMail({
        from: process.env.EMAIL_USER || "17k1.web2.demo@gmail.com",
        to,
        subject,
        html: content,
    });
}

module.exports = { send };
