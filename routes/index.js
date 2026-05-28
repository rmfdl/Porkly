const express = require('express');
const router = express.Router();
const registerRoute = require("./register")
const loginRoute = require("./login")
const logoutRoute = require("./logout")
const profileRoute = require("./profile")
const productsRoute = require("./products.js")
const Controller = require("../controllers/controller.js");


router.use("/register", registerRoute)
router.use("/login", loginRoute)
router.use("/logout", logoutRoute)
router.use("/profile", profileRoute)
router.use("/products", productsRoute)



// router.get('/', Controller.home)
router.get('/', Controller.home)


module.exports = router













// profile
// app.get('/profile', (req, res) => {
//   res.send('Hello World!')
// })
// app.post('/profile', (req, res) => {
//   res.send('Hello World!')
//   })