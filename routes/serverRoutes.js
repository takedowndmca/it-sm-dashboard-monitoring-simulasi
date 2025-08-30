const express = require('express');
const router = express.Router();
// const { Server } = require('../models');

const { Server, Check } = require('../models');

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
