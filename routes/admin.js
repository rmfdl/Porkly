const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

//  login
const admin = function (req, res, next) {
  console.log("object");
  next();
};
router.get("/", admin, AdminController.home);
router.get("/productManagement", admin, AdminController.productManagement);
router.get("/addProduct", admin, AdminController.addProduct);
router.post("/addProduct", admin, AdminController.postAddProduct);

module.exports = router;
