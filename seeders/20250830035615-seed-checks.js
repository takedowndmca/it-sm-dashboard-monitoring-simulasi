'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const intervals = [0, 1, 2, 3, 4]; // 5 log per server, hourly back

    const data = [];

    for (let hour of intervals) {
      data.push(
        {
          server_id: 1,
          status: 'UP',
          response_time_ms: Math.floor(Math.random() * 200),
          checked_at: new Date(now.getTime() - hour * 3600000),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          server_id: 2,
          status: 'DOWN',
          response_time_ms: null,
          checked_at: new Date(now.getTime() - hour * 3600000),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          server_id: 3,
          status: 'MAINT',
          response_time_ms: null,
          checked_at: new Date(now.getTime() - hour * 3600000),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      );
    }

    await queryInterface.bulkInsert('Checks', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Checks', null, {});
  }
};
