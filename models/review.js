const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');
const Company = require('./company');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Company,
      key: 'id'
    }
  },
  pros: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cons: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
});

Review.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Company.hasMany(Review, { foreignKey: 'companyId', as: 'reviews' });

module.exports = Review;
