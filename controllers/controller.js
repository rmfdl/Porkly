const {
  User,
  Profile,
  Product,
  ProductOrder,
  Order,
} = require("../models/index");
const { Op } = require("sequelize");
const currencyFormat = require("../helpers/currencyFormat");
const bcrypt = require("bcryptjs");

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
        namaLengkap,
      });
      await User.create({
        email,
        nomorHp,
        password,
        role,
      });

      res.redirect("/login");
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }

  static async addLoginForm(req, res) {
    try {
      res.render("login");
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }

  static async postLoginForm(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: { email },
      });

      if (user) {
        console.log(password, user.password);
        const isValidPassword = bcrypt.compareSync
        (password, user.password);
        // console.log(isValidPassword);
        if (isValidPassword) {
            req.session.userId = user.id;
            req.session.userRole = user.role;
            // req.session= {id: user.id,role:user.role }
            
          return res.redirect("/");
        } else
        {
          return res.redirect("/login");
        }
      }
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
}

module.exports = Controller;

//   where: {},
//       };
//       if (position) {
//         options.where.position = {
//           [Op.iLike]: `%${position}%`,
//         };
//       }
