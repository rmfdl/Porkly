const express = require("express");
const router = express.Router();
const registerRoute = require("./register");
const loginRoute = require("./login");
const logoutRoute = require("./logout");
const profileRoute = require("./profile");
const productsRoute = require("./products.js");
const cartRoute = require("./cart.js");
const Controller = require("../controllers/controller.js");

// router.get('/', Controller.home)
router.get("/", Controller.home);

router.use("/register", registerRoute);
router.use("/products", productsRoute);
router.use("/cart", cartRoute);
router.use("/login", loginRoute);

//middleware session

// const user =
router.use((req, res, next) => {
  console.log(req.session);
  if (!req.session.userId) {
    const error = "Please login first";
    return res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});

router.use((req, res, next) => {
  console.log(req.session);
  if (req.session.userRole !== "User") {
    const error = "You have no access";

    return res.redirect(`/login?error=${error}`);
  } else {
    next();
  }
});

router.use("/logout", logoutRoute);
router.use("/profile", profileRoute);

module.exports = router;

module.exports = router;

// profile
// app.get('/profile', (req, res) => {
//   res.send('Hello World!')
// })
// app.post('/profile', (req, res) => {
//   res.send('Hello World!')
//   })
