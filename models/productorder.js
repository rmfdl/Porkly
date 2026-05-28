"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductOrder.belongsTo(models.Product);
      ProductOrder.belongsTo(models.Order);
    }
  }
  ProductOrder.init(
    {
      ProductId: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: {
        type: DataTypes.INTEGER,
      },
      subtotal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductOrder",
    },
  );
  return ProductOrder;
};
