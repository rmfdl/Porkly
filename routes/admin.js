const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/adminController");

//  login

router.get("/", AdminController.home);
router.get("/productManagement", AdminController.productManagement);
router.get("/addProduct", AdminController.addProduct);
router.post("/addProduct", AdminController.postAddProduct);
router.get("/editProduct/:id", AdminController.editProduct);
router.post("/editProduct/:id", AdminController.posteditProduct);
router.get("/deleteProduct/:id", AdminController.deleteProduct);
module.exports = router;
