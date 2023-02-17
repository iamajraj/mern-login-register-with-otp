const Users = require("../../models/usersModel");
const jwtService = require("../../service/jwtService");
const UserOtp = require("../../models/userOtpModel");
const mailerService = require("../../service/mailerService");

module.exports = async (req, res) => {
    let {
        first_name,
        last_name,
        email,
        dob,
        nationality,
        referral_code,
        password,
    } = req.body;

    const isUserExists = await Users.findOne({ email });

    if (isUserExists)
        return res.status(400).json({ error: "Account Already Exists" });

    const user = new Users({
        first_name,
        last_name,
        email,
        dob,
        nationality,
        referral_code,
        password,
    });

    await user.save();

    const token = jwtService(user.toJSON());

    const otp = Math.floor(100000 + Math.random() * 900000);

    const existedOtp = await UserOtp.findOne({ email: user.email });

    if (existedOtp) {
        await UserOtp.deleteMany({ email: user.email });
    }

    await new UserOtp({ otp, user_id: user._id, email: user.email }).save();

    mailerService({
        to: user.email,
        from: "noreply@tg.com",
        subject: "Verification Mail TG✔",
        template: `<p>Dear ${user.first_name} ${user.last_name},</p>
        <p>Thank you for registering with our website. Please verify your email address by clicking on the button below:</p>
        <p>Your OTP is <b>${otp}</b></p>
        <p>If you did not sign up for our website, please disregard this email.</p>
        <p>Thank you,</p>
        <p>The Website Team</p>`,
    })
        .then(() => {})
        .catch((err) => console.log(err));

    res.status(200).json({
        user,
        token,
    });
};
