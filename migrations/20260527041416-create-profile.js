"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      namaLengkap: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      jenisKelamin: {
        type: Sequelize.STRING,
      },
      ttl: {
        type: Sequelize.DATE,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          // nama tabel
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
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
    await queryInterface.dropTable("Profiles");
  },
};
