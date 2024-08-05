const {Sequelize, DataTypes }=require("sequelize")


const config = require("./config/config.json")

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: "localhost",
    dialect: "mysql"
})

const Product = require("./models/products.js")(sequelize, DataTypes)
const Cart = require("./models/carts.js") (sequelize, DataTypes)
const Cartitem = require("./models/cartitems.js") (sequelize, DataTypes)
const User = require ("./models/users.js") (sequelize, DataTypes)


User.hasOne(Cart, { foreignKey: "userId"})  
Cart.belongsTo(User, { foreignKey: "userId"})

Cart.hasMany(Cartitem, { foreignKey: "cartId"})
Cartitem.belongsTo( Cart, { foreignKey: "cartId"})

Product.hasMany(Cartitem, { foreignKey: "productId"})
Cartitem.belongsTo(Product, { foreignKey: "productId"})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })


  sequelize
  .sync().then(() => {
    console.log('Database and tables created!');
  })
  .catch((err) => {
    console.log(err);
  });


  module.exports= {
    sequelize,
    Sequelize,
    Product,
    User,
    Cart,
    Cartitem,
  
  }