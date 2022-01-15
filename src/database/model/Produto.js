const { Model, DataTypes } = require('sequelize');
const sequelize = require('../index')

class Produto extends Model{}

Produto.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    peso: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    preco: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    quantidadeEmEstoque: {
        type: DataTypes.INTEGER,
    }
},
{
    sequelize,
    timestamps: true,
    underscored: true
});

module.exports = Produto;