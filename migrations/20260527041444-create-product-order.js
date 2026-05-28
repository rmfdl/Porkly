"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductOrders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          // nama tabel
          model: "Products",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {
          // nama tabel
          model: "Orders",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      subtotal: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductOrders");
  },
};
