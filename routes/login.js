const express = require('express');
const router = express.Router();
const Controller = require("../controllers/controller.js");

//  login
router.get('/', Controller.addLoginForm )
router.post('/', Controller.postLoginForm)

module.exports = router
