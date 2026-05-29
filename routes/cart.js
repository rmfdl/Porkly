const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller.js");

router.get("/", Controller.cart);
// Checkout
router.post("/checkout", Controller.checkout);
// Order
router.get("/order", Controller.orderHistory);
router.get("/order/:id", Controller.orderDetail);

module.exports = router;
