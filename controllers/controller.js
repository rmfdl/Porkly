const {User, Profile, Product, ProductOrder, Order }  = require("../models/index");
const { Op } = require("sequelize");
const currencyFormat = require("../helpers/currencyFormat");

class Controller {
    static async home(req, res) {
    try {
    const products = await Product.findAll();
    res.render("home", { products });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
 static async registerForm(req, res) {
    try {
     res.render("register");
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
   static async postRegisterForm(req, res) {
    try {
       res.redirect("/login");
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }

}

module.exports = Controller;