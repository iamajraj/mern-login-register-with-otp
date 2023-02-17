const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        default: null,
    },
    nationality: {
        type: String,
        default: null,
    },
    referral_code: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: true,
    },
    google_id: {
        type: String,
        default: null,
    },
    github_id: {
        type: String,
        default: null,
    },
    twitter_id: {
        type: String,
        default: null,
    },
    email_verified_at: {
        type: Date,
        default: null,
    },
});

UsersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

UsersSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Users", UsersSchema);
