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

    await Users.updateOne({
        $set: {
            email_verified_at: new Date(),
        },
    });

    const user = await Users.findById(user_id);

    const token = jwtService(user.toJSON());

    res.status(200).json({
        token,
        user,
    });
};
