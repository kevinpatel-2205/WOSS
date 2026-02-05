import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../config/mail.config.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.cookie("token", generateToken(user._id));
    console.log(user);

    try {
      await sendEmail({
        to: user.email,
        subject: "Welcome to App Name 🎉",
        text: `Hello ${user.name}, welcome to our platform!`,
        html: `
          <div style="max-width:600px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1)">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:30px;text-align:center;color:#ffffff">
    <h1 style="margin:0;font-size:26px;">🎉 Welcome to App Name!</h1>
    <p style="margin:8px 0 0;font-size:16px;opacity:0.9;">
      We’re excited to have you onboard
    </p>
  </div>

  <!-- Body -->
  <div style="padding:30px;color:#333333;">
    <h2 style="margin-top:0;">Hi ${user.name} 👋</h2>

    <p style="font-size:15px;line-height:1.6;">
      Your account has been <strong>successfully created</strong>, and you’re all set to explore
      everything <strong>App Name</strong> has to offer 🚀
    </p>

    <div style="background:#f4f6ff;border-left:5px solid #667eea;padding:15px;margin:20px 0;border-radius:8px;">
      <p style="margin:0;font-size:14px;">
        ✅ Secure login<br/>
        ✅ Personalized experience<br/>
        ✅ Access to exclusive features
      </p>
    </div>

    <!-- CTA Button -->
    <div style="text-align:center;margin:30px 0;">
      <a href="${process.env.FRONTEND_URL}/dashboard" target="_blank"
         style="background:#667eea;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:30px;font-size:15px;display:inline-block;">
        🚀 Get Started
      </a>
    </div>

    <p style="font-size:14px;line-height:1.6;">
      If you ever need help, just reply to this email — we’re always happy to help 💙
    </p>

    <p style="margin-top:25px;font-size:14px;">
      Cheers,<br/>
      <strong>The App Name Team</strong>
    </p>
  </div>

  <!-- Footer -->
  <div style="background:#f7f7f7;padding:15px;text-align:center;font-size:12px;color:#777;">
    © ${new Date().getFullYear()} App Name. All rights reserved.
  </div>
</div>
        `,
      });
    } catch (err) {
      console.log("Email failed but user registered");
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  res.cookie("token", generateToken(user._id));

  res.json({
    success: true,
    message: "Login successful",
    user,
  });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");

  res.json({
    success: true,
    users,
  });
};

export const getProfile = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};
