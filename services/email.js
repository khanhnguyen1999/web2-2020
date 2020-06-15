const nodemailer = require('nodemailer')

async function send(to,subject,content){
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port:587,
        secure: false,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
    })
    console.log(to)
    return transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        text:content,
    
    }).then(console.log).catch(console.error);
}

module.exports = {send};