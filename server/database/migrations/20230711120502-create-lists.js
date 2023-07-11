'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      note: {
        allowNull: false,
        type: Sequelize.STRING(20),
        validate: {
          is: `^((?!true|false|TRUE|FALSE).){1,20}$`,
          notEmpty: true,
          notNull: true,
        },
      },
      status: {
        allowNullL: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('Lists');
  },
};
