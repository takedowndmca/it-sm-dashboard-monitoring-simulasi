'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Incidents', [
      {
        server_id: 2,
        started_at: new Date(new Date().getTime() - 7200000), // 2 jam lalu
        ended_at: new Date(new Date().getTime() - 3600000),   // 1 jam lalu
        notes: 'Server mengalami down akibat overload koneksi.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        server_id: 3,
        started_at: new Date(new Date().getTime() - 10800000), // 3 jam lalu
        ended_at: null,
        notes: 'Maintenance terjadwal, masih berlangsung.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Incidents', null, {});
  }
};
