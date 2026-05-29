const express = require("express");
const router = express.Router();
const registerRoute = require("./register");
const loginRoute = require("./login");
const logoutRoute = require("./logout");
const profileRoute = require("./profile");
const productsRoute = require("./products.js");
const cartRoute = require("./cart.js");
const adminRoute = require("./admin.js");
const Controller = require("../controllers/controller.js");

// router.get('/', Controller.home)
router.get("/", Controller.home);

router.use("/register", registerRoute);
router.use("/login", loginRoute);

//middleware session

// const user =
const isLoggedIn = (req, res, next) => {
  console.log(req.session, "=== CEK SESSION ===");
  if (!req.session.userId) {
    const error = "Please login first";
    return res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
};

const isUser = (req, res, next) => {
  if (req.session.userRole !== "User") {
    const error = "You have no access";
    return res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
};
const isAdmin = (req, res, next) => {
  if (req.session.userRole !== "Admin") {
    const error = "You have no access to Admin Panel";
    return res.redirect(`/?error=${error}`);
  } else {
    next();
  }
};
router.use(isLoggedIn);
router.use("/logout", logoutRoute);
// Admin
router.use("/admin", isAdmin, adminRoute);
// User
router.use("/products", isUser, productsRoute);
router.use("/profile", isUser, profileRoute);
router.use("/cart", isUser, cartRoute);

module.exports = router;

// profile
// app.get('/profile', (req, res) => {
//   res.send('Hello World!')
// })
// app.post('/profile', (req, res) => {
//   res.send('Hello World!')
//   })
