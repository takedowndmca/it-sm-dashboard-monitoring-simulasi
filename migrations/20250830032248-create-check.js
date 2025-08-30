'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Checks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      server_id: {
        type: Sequelize.INTEGER
      },
     status: {
  type: Sequelize.ENUM('UP', 'DOWN', 'MAINT'),
  allowNull: false
},
      response_time_ms: {
        type: Sequelize.INTEGER
      },
      checked_at: {
        type: Sequelize.DATE
      },
      server_id: {
  type: Sequelize.INTEGER,
  references: {
    model: 'Servers',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Checks');
  }
};