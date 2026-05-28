const {User, Profile, Product, ProductOrder, Order }  = require("../models/index");
const { Op } = require("sequelize");
const currencyFormat = require("../helpers/currencyFormat");

//bagian home nanti tampilin 4 cotnoh product, lalu bikin link seem more products.

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

 static async addRegisterForm(req, res) {
    try {

     res.render("register");
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
   static async postRegisterForm(req, res) {
    try { 
        
    const { namaLengkap, email, nomorHp, password, role } = req.body;
    await User.findOne({
        include: [Profile],
       
    });
     await Profile.create({
       namaLengkap
       
      });
    await User.create({
        email, nomorHp, password, role 
      });

       res.redirect("/login");
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  
  static async addLoginForm(req, res) {
    try {
    
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }

  static async postLoginForm(req, res) {
   try { 
        
    const { namaLengkap, email, nomorHp, password, role } = req.body;
    await User.findOne({
        include: [Profile],
       
    });
     await Profile.create({
       namaLengkap
       
      });
    await User.create({
        email, nomorHp, password, role 
      });

       res.redirect("/");
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  


}

module.exports = Controller;