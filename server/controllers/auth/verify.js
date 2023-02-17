const UserOtp = require("../../models/userOtpModel");
const Users = require("../../models/usersModel");
const jwtService = require("../../service/jwtService");

module.exports = async (req, res) => {
    const { user_id, otp } = req.body;

    const userOtp = await UserOtp.findOne({ user_id });

    if (!userOtp)
        return res.status(400).json({ error: "User OTP Doesn't Exist" });

    if (userOtp.otp != otp)
        return res.status(400).json({
            error: "User OTP Doesn't Match",
        });

    const user = await Users.findById(user_id);

    user.email_verified_at = new Date();

    await user.save();

    const token = jwtService(user.toJSON());

    res.status(200).json({
        token,
        user,
    });
};
