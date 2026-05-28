"use strict";

/** @type {import('sequelize-cli').Migration} */
const fs = require("fs").promises;
module.exports = {
  async up(queryInterface, Sequelize) {
    let products = await fs.readFile("./data/products.json", "utf8");
    products = JSON.parse(products);

    products.forEach((product) => {
      delete product.id;
      product.createdAt = new Date();
      product.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Products", products);

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

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
