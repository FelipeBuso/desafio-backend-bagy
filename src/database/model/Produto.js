const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/index');
const Pedido = require('./Pedido');
const ProdutosPedido = require('./ProdutosPedido');

class Produto extends Model{}

Produto.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
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
        allowNull: false
    }
},
{
    sequelize,
    timestamps: true,
    underscored: true
});

// Produto.belongsToMany(Pedido, {
//     through: ProdutosPedido,
//     foreignKey: 'pedidoId',
//     otherKey: 'produtoId'
// })
module.exports = Produto;