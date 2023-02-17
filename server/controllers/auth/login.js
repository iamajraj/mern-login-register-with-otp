const Users = require("../../models/usersModel");
const jwtService = require("../../service/jwtService");

module.exports = async (req, res) => {
    let { email, password } = req.body;

    const user = await Users.findOne({
        email,
    });

    if (!user)
        return res.status(400).json({
            error: "Account Doesn't Exist",
        });

    let isValidPassword = await user.validatePassword(password);

    if (!isValidPassword)
        return res.status(400).json({
            error: "Email & Password doesn't match",
        });

    const token = jwtService(user.toJSON());

    res.status(200).json({
        token,
        user,
    });
};
