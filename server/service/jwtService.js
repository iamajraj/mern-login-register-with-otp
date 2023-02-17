const jwt = require("jsonwebtoken");

const jwtService = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET);
};

module.exports = jwtService;
