const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

// Service Price Options 
const ServicePriceOption = sequelize.define('ServicePriceOption', {
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
    allowNull: false,
  },
});

// Service 
const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('Normal', 'VIP'),
    allowNull: false,
  },
});

Service.hasMany(ServicePriceOption, { as: 'priceOptions', onDelete: 'CASCADE', onUpdate: 'CASCADE', foreignKey: 'serviceId' });
ServicePriceOption.belongsTo(Service, { foreignKey: 'serviceId', onDelete: 'CASCADE', onUpdate: 'CASCADE', targetKey: 'id' });

module.exports = { Service, ServicePriceOption };
