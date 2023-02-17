const nodemailer = require("nodemailer");

module.exports = async ({ to, from, subject, template, text }) => {
    // set your own mail server :)
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    try {
        let info = await transporter.sendMail({
            from,
            to,
            subject,
            text,
            html: template,
        });

        return {
            success: true,
            info,
        };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            error: err,
        };
    }
};
