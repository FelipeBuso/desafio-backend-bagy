const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/index')

class Endereco extends Model{}

Endereco.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    clienteId:{
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
            model: 'clientes',
            key: 'id',
            as: 'clienteId'
        }
    },
    rua: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    numero: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING,
    },
},
{
    sequelize,
    timestamps: false,
    underscored: true    
});

module.exports = Endereco;