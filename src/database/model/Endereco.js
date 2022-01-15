// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../../database/index')
// const Cliente = require('./Cliente');


// class Endereco extends Model{}

// Endereco.init({
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     clienteId:{
//         type: DataTypes.INTEGER,
//         foreignKey: true,
//         allowNull: false,
//     },
//     rua: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     bairro: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     cidade: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     estado: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     pais: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     cep: {
//         type: DataTypes.NUMBER,
//         allowNull: false
//     },
//     numero: {
//         type: DataTypes.NUMBER,
//         allowNull: false
//     },
//     complemento: {
//         type: DataTypes.STRING,
//     },
// },
// {
//     sequelize,
//     timestamps: false,
//     underscored: true
// });

// // Endereco.belongsTo(Cliente);

// module.exports = Endereco;