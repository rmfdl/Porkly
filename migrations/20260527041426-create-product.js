'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaProduct: {
        type: Sequelize.STRING
      },
      kodeProduct: {
        type: Sequelize.STRING
      },
      jenis: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.INTEGER
      },
      imageURL: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      beratProduct: {
        type: Sequelize.INTEGER
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      expired: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};