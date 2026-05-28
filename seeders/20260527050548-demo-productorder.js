'use strict';

/** @type {import('sequelize-cli').Migration} */
const fs = require('fs').promises
module.exports = {
  async up (queryInterface, Sequelize) {
    let productOrders = await fs.readFile("./data/productOrders.json", "utf8");
    productOrders = JSON.parse(productOrders);

    productOrders.forEach((productOrder) => {
      delete productOrder.id;
      productOrder.createdAt = new Date();
      productOrder.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("ProductOrders", productOrders);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('ProductOrders', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
