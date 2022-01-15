const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/index')
const Endereco = require('./Endereco');


class Cliente extends Model{}

Cliente.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nomeCompleto:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataDeNascimento: {
        type: DataTypes.STRING,
    }
},
{
    sequelize,
    timestamps: true,
    underscored: true
});

Cliente.hasMany(Endereco, {
    foreignKey: 'clienteId',
    as: 'endereco'
})
module.exports = Cliente;