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
  async function updateOrderTotal(productOrderInstance, options) {
    const { OrderId } = productOrderInstance;
    const { models } = sequelize; // Mengambil semua model yang terdaftar di sequelize

    // 1. Hitung total subtotal dari ProductOrder berdasarkan OrderId
    const totalHarga = await models.ProductOrder.sum("subtotal", {
      where: { OrderId: OrderId },
      transaction: options.transaction, // Aman untuk database transaction
    });

    // 2. Update field totalHarga di model Order
    await models.Order.update(
      { totalHarga: totalHarga || 0 },
      {
        where: { id: OrderId },
        transaction: options.transaction,
      },
    );
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
      hooks: {
        afterCreate: async (productOrder, options) => {
          await updateOrderTotal(productOrder, options);
        },
        // Dipanggil setelah instance.update() berhasil (saat quantity bertambah)
        afterUpdate: async (productOrder, options) => {
          await updateOrderTotal(productOrder, options);
        },
      },
    },
  );
  return ProductOrder;
};
