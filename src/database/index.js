const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('bagy', 'root', 'rootsecret',{
    host: './bagy.sqlite',
    dialect: 'sqlite'
});

module.exports = sequelize;