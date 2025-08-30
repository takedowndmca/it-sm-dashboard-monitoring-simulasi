const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 3000;

// Setup view
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
const serverRoutes = require('./routes/serverRoutes');
app.use('/servers', serverRoutes);

// Default redirect
app.get('/', (req, res) => res.redirect('/servers'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
