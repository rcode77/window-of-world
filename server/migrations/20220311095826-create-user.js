"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      subscribe: {
        type: Sequelize.STRING,
        defaultValue: "Not Subscribe",
      },
      gender: {
        type: Sequelize.STRING,
        defaultValue: "-",
      },
      phone: {
        type: Sequelize.STRING,
        defaultValue: "-",
      },
      address: {
        type: Sequelize.STRING,
        defaultValue: "-",
      },
      userImage: {
        type: Sequelize.STRING,
        defaultValue: "-",
      },

      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
