const {
  User,
  Profile,
  Product,
  ProductOrder,
  Order,
} = require("../models/index");
const { Op } = require("sequelize");
const currencyFormat = require("../helpers/currencyFormat");

class AdminController {
  static async home(req, res) {
    try {
      res.render("admin/home.ejs", {});
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async productManagement(req, res) {
    try {
      const products = await Product.findAll();
      res.render("admin/productManagement.ejs", { products });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async addProduct(req, res) {
    try {
      const types = [
        "Pork Belly",
        "Pork Loin",
        "Tenderloin",
        "Pork Shoulder",
        "Pork Leg",
        "Pork Ribs",
        "Minced Pork ",
        "Bacon",
        "Ham",
        "Sausage",
        "Lard",
        "Others",
      ];
      res.render("admin/addProduct.ejs", { types });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async postAddProduct(req, res) {
    try {
      const {
        product,
        type,
        price,
        imageURL,
        stock,
        weight,
        description,
        expDate,
      } = req.body;

      await Product.create({
        namaProduct: product,
        jenis: type,
        harga: price,
        imageURL,
        stock,
        beratProduct: weight,
        deskripsi: description,
        expired: expDate,
      });
      res.redirect("admin/productManagement.ejs");
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
}

module.exports = AdminController;
