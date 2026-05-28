
const express = require('express')
const app = express()
const port = 3000
const routes = require("./routes/index")


app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use("/", routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// // cart
// app.get('/cart', (req, res) => {
//   res.send('Hello World!')
// })
// app.post('/products/:id/cart', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/cart/:id/delete', (req, res) => {
//   res.send('Hello World!')
// })

// // order/checkout
// app.get('/cart/checkout', (req, res) => {
//   res.send('Hello World!')
// })


  
// app.post('/products/:id/order', (req, res) => {
//   res.send('Hello World!')
//   })
//   app.get('/orders/invoice', (req, res) => {
//   res.send('Hello World!')
//   })

// //   untuk admin

// app.get('/products/add', (req, res) => {
//   res.send('Hello World!')
// })
// app.post('/products/add', (req, res) => {
//   res.send('Hello World!')
// })


// app.get('/products/edit/:id', (req, res) => {
//   res.send('Hello World!')
// })
// app.post('/products/edit/:id', (req, res) => {
//   res.send('Hello World!')
// })
// app.post('/products/delete/:id', (req, res) => {
//   res.send('Hello World!')
// })
// bagian orders

// app.get('/orders', (req, res) => {
//   res.send('Hello World!')
// })
// app.post('/orders', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/orders/:id/invoice', (req, res) => {
//   res.send('Hello World!')
// })

// profile

// app.get('/profile', (req, res) => {
//   res.send('Hello World!')
// })
// app.post('/profile', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/admin/dashboard', (req, res) => {
//   res.send('Hello World!')
// })







/*
Urutan migrasi (user, profile, product, order,productOrder)
//User

 npx sequelize-cli model:generate --name User --attributes nomorHp:integer,email:string,password:string,role:string

//  Profile 

 npx sequelize-cli model:generate --name Profile --attributes namaLengkap:string,alamat:string,jenisKelamin:string,ttl:date,UserId:integer

// Product
 npx sequelize-cli model:generate --name Product --attributes namaProduct:string,kodeProduct:integer,jenis:string,harga:integer,imageURL:string,stock:integer,beratProduct:integer,deskripsi:string,expired:date


//  Order

 npx sequelize-cli model:generate --name Order --attributes tanggalOrder:date,totalHarga:integer,status:string,UserId:integer


// ProductOrder
  npx sequelize-cli model:generate --name ProductOrder --attributes ProductId:integer,OrderId:integer,quantity:integer,price:integer,subtotal:integer
 

// kodeProduct:integer
 



Urutan migrasi (user, profile, product, order,productOrder)

Assosiation 
//User
User.hasOne(Profile)
User.hasMany(Order)

//Profile
Profile.belongsTo(User)


// Product

Product.belongsToMany(Order, {
  through: ProductOrder
})

// Order
Order.belongsTo(User)
Order.belongsToMany(Product, {
  through: ProductOrder
})

// ProductOrder

ProductOrder.belongsTo(Product)
ProductOrder.belongsTo(Order)

//reference di migration//

await queryInterface.createTable('Profiles', {
  // kolom kain
  UserId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Users',   // nama tabel, bukan model
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
});

*/