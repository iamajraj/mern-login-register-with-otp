const mongoose = require("mongoose");

const UserOtpSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
    },
    email: {
        type: String,
    },
    otp: String,
});

module.exports = mongoose.model("UserOtp", UserOtpSchema);
