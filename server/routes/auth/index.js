const express = require("express");
const registerController = require("../../controllers/auth/register");
const loginController = require("../../controllers/auth/login");
const verifyController = require("../../controllers/auth/verify");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/verify", verifyController);

module.exports = router;
