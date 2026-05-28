const express = require('express');
const router = express.Router();
const Controller = require("../controllers/controller.js");

// products untuk user
router.get('/', (req, res) => {
  res.send('Hello World!')
})
router.get('/:id', (req, res) => {
  res.send('Hello World!')
})
// router.get('/products/:id/invoice', (req, res) => {
//   res.send('Hello World!')
// })

module.exports = router