const express = require('express');
const router = express.Router();
const Controller = require("../controllers/controller.js");

//  login
router.get('/', (req, res) => {
  res.send('Hello World!')
})
router.post('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router
