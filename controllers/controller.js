const {
  User,
  Profile,
  Product,
  ProductOrder,
  Order,
} = require("../models/index");
const { Op, where } = require("sequelize");
const currencyFormat = require("../helpers/currencyFormat");
const bcrypt = require("bcryptjs");
const easyinvoice = require("easyinvoice");

//bagian home nanti tampilin 4 cotnoh product, lalu bikin link seem more products.

class Controller {
  static async home(req, res) {
    try {
      // const products = await Product.findAll();
      res.render("home", {
        isLogin: req.session.userId,
        userRole: req.session.userRole,
      });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async readProduct(req, res) {
    try {
      const { search } = req.query;
      let options = {
        order: [["harga", "ASC"]],

        where: {},
      };
      if (search) {
        options.where.namaProduct = {
          [Op.iLike]: `%${search}%`,
        };
      }

      const products = await Product.findAll(options);

      res.render("products", {
        products,
        isLogin: req.session.userId,
        currencyFormat,
      });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async readProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: {
          id: id,
        },
      });

      res.render("productDetails", {
        product,
        currencyFormat,
        isLogin: req.session.userId,
      });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async addToCart(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id: id },
      });
      const user = await User.findOne({
        where: { id: req.session.userId },
      });
      let [order, created] = await Order.findOrCreate({
        where: { UserId: user.id, status: "Diproses" },
      });
      const checkProductExist = await ProductOrder.findOne({
        where: {
          ProductId: id,
          OrderId: order.id,
        },
      });
      if (checkProductExist) {
        const newQuantity = checkProductExist.quantity + 1;

        await checkProductExist.update({
          quantity: newQuantity,
          subtotal: newQuantity * product.harga,
        });
      } else {
        await ProductOrder.create({
          ProductId: id,
          OrderId: order.id,
          quantity: 1,
          price: product.harga,
          subtotal: 1 * product.harga,
        });
      }
      res.redirect("/products");
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }

  static async addRegisterForm(req, res) {
    try {
      const { errors } = req.query;
      res.render("register", { isLogin: req.session.userId, errors });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async postRegisterForm(req, res) {
    try {
      const { namaLengkap, email, nomorHp, password, role } = req.body;
      await User.findOne({
        //buat ambil nama
        include: [Profile],
      });
      const user = await User.create({
        email,
        nomorHp,
        password,
        role,
      });

      await Profile.create({
        namaLengkap,
        UserId: user.id,
      });
      res.redirect("/login");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((element) => element.message);
        res.redirect(`/register?errors=${errors}`);
      } else {
        res.send(error);
      }
    }
  }

  static async addLoginForm(req, res) {
    try {
      const { error } = req.query;
      res.render("login", { isLogin: req.session.userId, error });
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
      //session middleware
      if (user) {
        console.log(password, user.password);
        const isValidPassword = bcrypt.compareSync(password, user.password);
        // console.log(isValidPassword);
        if (isValidPassword) {
          req.session.userId = user.id;
          req.session.userRole = user.role;
          // req.session= {id: user.id,role:user.role }
          if (req.session.userRole === "User") {
            return res.redirect("/");
          } else if (req.session.userRole === "Admin") {
            return res.redirect("/admin");
          }
        } else {
          return res.redirect("/login?error=Email atau password salah");
        }
      } else {
        return res.redirect("/login?error=email tidak terdaftar");
      }
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) res.send(err);
      else res.redirect("/");
    });
  }

  static async cart(req, res) {
    try {
      const order = await Order.findOne({
        where: { UserId: req.session.userId, status: "Diproses" },
      });
      if (!order) {
        return res.render("cart", {
          isLogin: req.session.userId,
          order: null,
          productOrder: [],
        });
      }

      const productOrder = await ProductOrder.findAll({
        where: { OrderId: order.id },
        include: ["Product"],
      });
      res.render("cart", {
        isLogin: req.session.userId,
        order,
        productOrder,
        currencyFormat,
      });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }

  static async checkout(req, res) {
    try {
      const order = await Order.findOne({
        where: {
          UserId: req.session.userId,
          status: "Diproses",
        },
      });

      if (!order) {
        return res
          .status(400)
          .send("Tidak ada keranjang aktif yang bisa dicheckout.");
      }
      const productOrders = await ProductOrder.findAll({
        where: { OrderId: order.id },
        include: ["Product"],
      });

      if (productOrders.length === 0) {
        return res.status(400).send("Keranjang belanja kamu masih kosong.");
      }

      for (const item of productOrders) {
        const product = item.Product;

        // Cek apakah stok cukup
        if (product.stok < item.quantity) {
          return res
            .status(400)
            .send(
              `Stok produk "${product.namaProduct}" tidak mencukupi. Sisa stok: ${product.stok}`,
            );
        }

        // Kurangi stok produk
        await product.update({
          stock: product.stock - item.quantity,
        });
      }

      await order.update({
        status: "Selesai",
      });

      res.redirect("/products?checkout=success");
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async orderHistory(req, res) {
    try {
      const orders = await Order.findAll({
        where: {
          UserId: req.session.userId,
          status: "Selesai",
        },
        include: {
          model: ProductOrder,
          include: ["Product"],
        },
        order: [["updatedAt", "DESC"]],
      });

      res.render("OrderHistory", {
        isLogin: req.session.userId,
        orders,
        currencyFormat,
      });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
  static async orderDetail(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findOne({
        where: {
          id: id,
          UserId: req.session.userId,
        },
        include: {
          model: ProductOrder,
          include: ["Product"],
        },
      });

      if (!order) {
        return res.status(404).send("Pesanan tidak ditemukan.");
      }

      res.render("OrderDetail", {
        isLogin: req.session.userId,
        order,
        currencyFormat,
      });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
}

module.exports = Controller;

// cek validasi role, nama, validasi email,
