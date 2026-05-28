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

//middleware session
router.use((req, res, next) => {
  console.log(req.session)
  if(!req.session.userId){
    const error ="Please login first"
    res.redirect(`/login?error-${error}`)
  } else {
    next()
  }
});



router.use((req, res, next) => {
  console.log(req.session)
  if(!req.session.userRole === "User"){
    const error ="You have no access"
    
    res.redirect(`/login?error-${error}`)
  } else {
    next()
  }
});


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