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
      const totalUser = await User.count();
      const totalProduct = await Product.count();
      const totalOrder = await Order.count();

      // Kirim datanya ke file EJS
      res.render("admin/home.ejs", {
        totalUser,
        totalProduct,
        totalOrder,
      });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async productManagement(req, res) {
    try {
      const products = await Product.findAll();
      res.render("admin/productManagement", { products, currencyFormat });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async addProduct(req, res) {
    try {
      const { errors } = req.query;
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
      res.render("admin/addProduct.ejs", { types, errors });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async postAddProduct(req, res) {
    try {
      const {
        namaProduct,
        jenis,
        harga,
        stock,
        beratProduct,
        imageURL,
        deskripsi,
      } = req.body;

      await Product.create({
        namaProduct,
        jenis,
        harga,
        stock,
        beratProduct,
        imageURL,
        deskripsi,
      });

      res.redirect("/admin/productManagement");
    } catch (error) {
      console.log(error, "ERROR STORE PRODUCT");

      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((element) => element.message);
        res.redirect(`/admin/addProduct?errors=${errors}`);
      } else {
        res.send(error);
      }
    }
  }
  static async editProduct(req, res) {
    try {
      const { id } = req.params;
      const { errors } = req.query;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).send("Produk tidak ditemukan");
      }

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

      res.render("admin/editProduct.ejs", { product, types, errors });
    } catch (error) {
      console.log(error, "ERROR EDIT PRODUCT FORM");
      res.send(error);
    }
  }
  static async posteditProduct(req, res) {
    try {
      const { id } = req.params;
      const {
        namaProduct,
        jenis,
        harga,
        stock, // Menggunakan stock sesuai penyesuaianmu
        beratProduct,
        imageURL,
        deskripsi,
      } = req.body;

      await Product.update(
        {
          namaProduct,
          jenis,
          harga,
          stock,
          beratProduct,
          imageURL,
          deskripsi,
        },
        { where: { id } },
      );

      res.redirect("/admin/productManagement");
    } catch (error) {
      console.log(error, "ERROR UPDATE PRODUCT");

      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((element) => element.message);
        res.redirect(`/admin/editProduct/${req.params.id}?errors=${errors}`);
      } else {
        res.send(error);
      }
    }
  }
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      await Product.destroy({ where: { id } });

      res.redirect("/admin/productManagement");
    } catch (error) {
      console.log(error, "ERROR DELETE PRODUCT");
      res.send(error);
    }
  }
}

module.exports = AdminController;
