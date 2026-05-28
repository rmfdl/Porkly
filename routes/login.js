const express = require('express');
const router = express.Router();
const Controller = require("../controllers/controller.js");
const session = require('express-session');

//  login
router.get('/', Controller.addLoginForm )
router.post('/', Controller.postLoginForm)



module.exports = router
