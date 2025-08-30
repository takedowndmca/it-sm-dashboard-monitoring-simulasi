'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Check extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Check.init({
    server_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    response_time_ms: DataTypes.INTEGER,
    checked_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Check',
  });
  return Check;
};