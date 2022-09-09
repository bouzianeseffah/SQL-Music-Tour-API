'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('set-times', {
      set_time__id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      available_start_time: {
        type: Sequelize.DATE,
        allowNull: false,

      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false,

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('set-times');
  }
};