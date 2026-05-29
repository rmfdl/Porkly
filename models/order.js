"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User);
      Order.hasMany(models.ProductOrder);
      Order.belongsToMany(models.Product, { through: models.ProductOrder });
    }
  }
  Order.init(
    {
      tanggalOrder: DataTypes.DATE,
      totalHarga: DataTypes.INTEGER,
      status: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (order, options) => {
          order.tanggalOrder = new Date();
          order.totalHarga = 0;
          order.status = "Diproses";
        },
      },
      sequelize,
      modelName: "Order",
    },
  );
  return Order;
};
