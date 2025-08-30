const express = require('express');
const router = express.Router();
// const { Server } = require('../models');

// const { Server, Check } = require('../models');

const { Server, Check, Incident } = require('../models');
const moment = require('moment');
const { Op } = require('sequelize');

// GET: Dashboard monitoring
router.get('/dashboard', async (req, res) => {
  // KPI: Total Server dan Status
  const totalServers = await Server.count();
  const upServers = await Server.count({ where: { status: 'UP' } });
  const downServers = await Server.count({ where: { status: 'DOWN' } });
  const maintServers = await Server.count({ where: { status: 'MAINT' } });

  // Grafik Response Time 24 Jam
  const now = moment();
  const past24Hours = now.clone().subtract(24, 'hours').toDate();

  const checksRaw = await Check.findAll({
  where: { checked_at: { [Op.gte]: past24Hours } },
  include: [{ model: Server }]
});
const checks = checksRaw.map(check => ({
  time: moment(check.checked_at).format('HH:mm'),
  responseTime: check.response_time_ms
}));


//   const checks = await Check.findAll({
//     where: { checked_at: { [Op.gte]: past24Hours } },
//     include: [{ model: Server }]
//   });

  // Pie Chart: Status Server
  const statusCounts = {
    UP: await Server.count({ where: { status: 'UP' } }),
    DOWN: await Server.count({ where: { status: 'DOWN' } }),
    MAINT: await Server.count({ where: { status: 'MAINT' } })
  };

  // Recent Incidents
//   const incidents = await Incident.findAll({
//     order: [['started_at', 'DESC']],
//     limit: 5
//   });

const incidents = await Incident.findAll({
  order: [['started_at', 'DESC']],
  limit: 5,
  include: [{ model: Server }]
});

console.log(checks)

  res.render('dashboard/index', {
    totalServers,
    upServers,
    downServers,
    maintServers,
    checks,
    statusCounts,
    incidents,
    moment 
  });
});

// POST: Toggle Status
router.post('/toggle-status/:id', async (req, res) => {
  const server = await Server.findByPk(req.params.id);
  if (!server) return res.redirect('/servers');

  const statusCycle = ['UP', 'DOWN', 'MAINT'];
  const nextStatus = statusCycle[(statusCycle.indexOf(server.status) + 1) % 3];

  await server.update({ status: nextStatus });

  res.redirect('/servers');
});

// POST: Generate Sample Logs (for all servers)
router.post('/generate-sample-logs', async (req, res) => {
  const servers = await Server.findAll();
  const now = new Date();

  for (const server of servers) {
    const isDown = server.status === 'DOWN';
    await Check.create({
      server_id: server.id,
      status: server.status,
      response_time_ms: isDown ? null : Math.floor(Math.random() * 500),
      checked_at: now
    });
  }

  res.redirect('/servers');
});


// GET: Semua server
router.get('/', async (req, res) => {
  const servers = await Server.findAll();
  res.render('servers/index', { servers });
});

// GET: Form tambah server
router.get('/create', (req, res) => {
  res.render('servers/create');
});

// POST: Simpan server baru
router.post('/create', async (req, res) => {
  const { name, ip, location, service_type, status } = req.body;
  await Server.create({ name, ip, location, service_type, status });
  res.redirect('/servers');
});

// GET: Form edit
router.get('/edit/:id', async (req, res) => {
  const server = await Server.findByPk(req.params.id);
  res.render('servers/edit', { server });
});

// POST: Update data
router.post('/edit/:id', async (req, res) => {
  const { name, ip, location, service_type, status } = req.body;
  await Server.update(
    { name, ip, location, service_type, status },
    { where: { id: req.params.id } }
  );
  res.redirect('/servers');
});

// POST: Hapus server
router.post('/delete/:id', async (req, res) => {
  await Server.destroy({ where: { id: req.params.id } });
  res.redirect('/servers');
});

module.exports = router;
