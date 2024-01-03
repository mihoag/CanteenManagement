const nodemailer = require("nodemailer");
const userM = require("../model/user.m");

module.exports = {
  sendMail: async function (data) {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gamil.com",
      port: 587,
      secure: false,
      auth: {
        user: "nguyennhathao01012003@gmail.com",
        pass: "jvvs tjjh vgbb jekt",
      },
    });

    const toEmail = await userM.getAllEmail();
    const mailOptions = {
      from: "admin@gmail.com",
      to: toEmail,
      subject: "[Canteen - Marketing] Giới thiệu món mới",
      html: require("./contentEmail")(data),
    };

    await transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
};