"use strict";

/** @type {import('sequelize-cli').Migration} */
const fs = require("fs").promises;
module.exports = {
  async up(queryInterface, Sequelize) {
    let profiles = await fs.readFile("./data/profiles.json", "utf8");
    profiles = JSON.parse(profiles);

    profiles.forEach((profile) => {
      delete profile.id;
      profile.createdAt = new Date();
      profile.updatedAt = new Date();
    });

    await queryInterface.bulkInsert("Profiles", profiles);
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
    await queryInterface.bulkDelete("Profiles", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
