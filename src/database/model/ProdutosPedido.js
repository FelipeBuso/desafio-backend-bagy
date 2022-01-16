const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/index');
const Pedido = require('./Pedido');
const Produto = require('./Produto');

class ProdutosPedido extends Model{}

ProdutosPedido.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    pedidoId:{
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'id',
            as: 'pedidoId'
        }
    },
    produtoId:{
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        references: {
            model: Produto,
            key: 'id',
            as: 'produtoId'
        }
    },
    quantidade: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
},
{
    sequelize,
    timestamps: false,
    underscored: true    
});

module.exports = ProdutosPedido;