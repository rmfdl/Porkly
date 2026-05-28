const express = require('express');
const router = express.Router();
const Controller = require("../controllers/controller.js");

// register
router.get('/', Controller.registerForm)
router.post('/', Controller.postRegisterForm)

module.exports = router