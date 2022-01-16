const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../database/index');
const Cliente = require('./Cliente');
const Produto = require('./Produto');
const ProdutosPedido = require('./ProdutosPedido');

class Pedido extends Model{}

Pedido.init({
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
        references: {
            model: 'clientes',
            key: 'id',
            as: 'clienteId'
        }
    },
},
{
    sequelize,
    timestamps: false,
    underscored: true    
});

Pedido.belongsTo(Cliente, {
    foreignKey: 'clienteId',
    as: 'cliente'
})

Pedido.belongsToMany(Produto, {
    through: ProdutosPedido,
    foreignKey: 'produtoId',
    otherKey: 'pedidoId',
});

module.exports = Pedido;