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
      // const products = await Product.findAll();
      res.render("home", {isLogin: req.session.userId,
      userRole: req.session.userRole});
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

       res.render("products", { products,isLogin: req.session.userId, currencyFormat });
      
       
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

      res.render("productDetails", { product, currencyFormat, isLogin: req.session.userId});

     
       
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
    static async addToCart(req, res) {
    try {
      
      
      
      // res.render("login", {isLogin: req.session.userId, error });
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }

  static async addRegisterForm(req, res) {
    try {
      const { errors } = req.query;
      res.render("register", {isLogin: req.session.userId, errors

      });
       
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
        UserId: user.id
      });
      res.redirect("/login");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errors = error.errors.map((element) => element.message);
        res.redirect(
          `/register?errors=${errors}`,
        );
      } else {
        res.send(error);
      }
      
    }
  }

  static async addLoginForm(req, res) {
    try {
       const { error } = req.query
      res.render("login", {isLogin: req.session.userId, error });
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

          return res.redirect("/login?error=email tidak terdaftar");
        }
      }
    } catch (error) {
      res.send(error);
      console.log(error, "ERROR");
    }
  }
   static logout(req, res) {
    req.session.destroy((err) => {
    if (err)res.send(err)
    else 
    res.redirect("/")
    })
    
  }

  //   static async cart(req, res) {
  //   try {
  //      await create.Order()
  //   } catch (error) {
  //     res.send(error);
  //     console.log(error, "ERROR");
  //   }
  // }


}

module.exports = Controller;

// cek validasi role, nama, validasi email, 