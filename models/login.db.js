const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Login = sequelize.define('Login', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Login;
