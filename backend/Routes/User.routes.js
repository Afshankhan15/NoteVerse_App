const express = require("express");
const router = express.Router();

const userController = require('../Controllers/User.controllers'); // Import the controller

// API --> TO REGISTER USER
router.post("/register", userController.Register);

// API --> TO LOGIN USER
router.post("/login", userController.Login);

module.exports = router;
