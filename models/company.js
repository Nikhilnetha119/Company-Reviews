const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
});


module.exports = Company;
