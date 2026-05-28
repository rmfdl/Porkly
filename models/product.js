'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Order, { through: models.ProductOrder })
    }
  }
  Product.init({
    namaProduct: DataTypes.STRING,
    kodeProduct: DataTypes.STRING,
    jenis: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    beratProduct: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    expired: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};