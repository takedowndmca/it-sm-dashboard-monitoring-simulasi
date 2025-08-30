'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.Server = require('./server')(sequelize, Sequelize.DataTypes);
db.Check = require('./check')(sequelize, Sequelize.DataTypes);
db.Incident = require('./incident')(sequelize, Sequelize.DataTypes);

// Define associations
db.Server.hasMany(db.Check, { foreignKey: 'server_id' });
db.Check.belongsTo(db.Server, { foreignKey: 'server_id' });

db.Server.hasMany(db.Incident, { foreignKey: 'server_id' });
db.Incident.belongsTo(db.Server, { foreignKey: 'server_id' });

module.exports = db;
