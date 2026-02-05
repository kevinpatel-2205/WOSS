import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    console.log("Sending email to:", to);

    const mailOptions = {
      from: `App Name`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    return info;
  } catch (error) {
    console.error("Email send failed ❌", error);
    throw error;
  }
};

export default sendEmail;
