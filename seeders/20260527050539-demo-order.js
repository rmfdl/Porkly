'use strict';

/** @type {import('sequelize-cli').Migration} */
const fs = require('fs').promises
module.exports = {
  async up (queryInterface, Sequelize) {
    let orders = await fs.readFile("./data/orders.json", "utf8");
    orders = JSON.parse(orders);

    orders.forEach((order) => {
      delete order.id;
      order.createdAt = new Date();
      order.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Orders", orders);
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
     await queryInterface.bulkDelete('Products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
