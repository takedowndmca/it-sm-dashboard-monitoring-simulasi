'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Servers', [
      {
        name: 'Alpha',
        ip: '192.168.0.1',
        location: 'Jakarta',
        service_type: 'Web',
        status: 'UP',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Beta',
        ip: '192.168.0.2',
        location: 'Surabaya',
        service_type: 'Database',
        status: 'DOWN',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gamma',
        ip: '192.168.0.3',
        location: 'Makassar',
        service_type: 'API',
        status: 'MAINT',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Servers', null, {});
  }
};
