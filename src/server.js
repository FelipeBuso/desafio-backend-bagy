const { gql, ApolloServer } = require('apollo-server');
// const { where } = require('sequelize/dist');
const sequelize = require('./database/index');
const Cliente = require('./database/model/Cliente');
const Endereco = require('./database/model/Endereco');
const Pedido = require('./database/model/Pedido');
const Produto = require('./database/model/Produto');
const ProdutosPedido = require('./database/model/ProdutosPedido')

sequelize.sync().then(() => console.log('db está pronto'))

// let users = [{id: 1, nome: 'Felipe', email: 'felipe@teste.com'}];

const typeDefs = gql`
    type Cliente {
        id: ID!
        nomeCompleto: String!
        email: String!
        cpf: String!
        dataDeNascimento: String!,
        endereco: [Endereco!]!
    }

    type Endereco {
        id: ID!
        clienteId: Int!
        rua: String!
        bairro: String!
        cidade: String!
        estado: String!
        pais: String!
        cep: Int!
        numero: Int!
        complemento: String
    }

    type Produto {
        id: ID!
        nome: String!
        imagem: String!
        descricao: String!
        peso: Float!
        preco: Float!
        quantidadeEmEstoque: Int!
    }

    type Pedido {
        id: ID!
        clienteId: Int!
        cliente: Cliente
        produtosPedido: [ProdutosPedido]
    }

    type ProdutosPedido {
        id: ID!
        pedidoId: Int!
        produtoId: Int!
        quantidade: Int!
        produto: [Produto!]!
    }

    type Query {
        clientes: [Cliente]
        cliente(id: ID!): Cliente
        produtos: [Produto]
        produto(id: ID!): Produto
        enderecos: [Endereco]
        pedidos: [Pedido]
        pedido(id: ID!): Pedido
        produtosPedido(pedidoId: Int!): [ProdutosPedido]
    }

    type Mutation {
        createCliente(
            nomeCompleto: String!,
            email: String!,
            cpf: String!,
            dataDeNascimento: String!
        ): Cliente,

        createEndereco(
            clienteId: Int!
            rua: String!
            bairro: String!
            cidade: String!
            estado: String!
            pais: String!
            cep: Int!
            numero: Int!
            complemento: String
        ): Endereco

        createProduto(
            nome: String!
            imagem: String!
            descricao: String!
            peso: Float!
            preco: Float!
            quantidadeEmEstoque: Int!
        ): Produto


        createPedido(
            clienteId: Int!
        ): Pedido
        
        createProdutosPedido(
            pedidoId: Int!
            produtoId: Int!
            quantidade: Int!
        ): ProdutosPedido
    }
`;

const resolvers = {
    Query: {
        clientes: async () => await Cliente.findAll({
            include: { model: Endereco, as: 'endereco' }
        }),

        cliente: async (_, { id }) => await Cliente.findByPk(id, 
            { include: { model: Endereco, as: 'endereco' } }),

        produtos: async () => await Produto.findAll(),

        produto: async (_, { id }) => await Produto.findByPk(id),

        enderecos: async () => await Endereco.findAll(),

        produtosPedido: async (_, { pedidoId }) => await ProdutosPedido.findAll({
            where: { pedidoId },
            include: { 
                model: Produto,
                where: ProdutosPedido.produtoId = Produto.id
            },
        }),

        pedidos: async () => await Pedido.findAll({
            include: [
                { model: Cliente, as: 'cliente'},
            ]
        }),

        pedido: async (_, { id }) => await Pedido.findByPk(id, {
            include: [
                { 
                    model: Cliente, as: 'cliente',
                    include: { model: Endereco, as: 'endereco' }
                },
                { 
                    model: ProdutosPedido,
                    as: 'pedidos',
                    where: { 'pedido_id': id },
                    include: { model: Produto, as: 'produtos'}
                }
            ]
        })
    },

    Mutation: {
        createCliente: async (_, { nomeCompleto, email, cpf, dataDeNascimento }) => {
            const cliente = { nomeCompleto, email, cpf, dataDeNascimento }
            return await Cliente.create(cliente);
        },

        createProduto: async (_, { nome, imagem, descricao, peso, preco, quantidadeEmEstoque }) => {
            const produto = { nome, imagem, descricao, peso, preco, quantidadeEmEstoque}
            return await Produto.create(produto);
        },

        createEndereco: async (_, 
            { clienteId, rua, bairro, cidade, estado, pais, cep, numero, complemento }
        ) => {
            const endereco = { clienteId, rua, bairro, cidade, estado, pais, cep, numero, complemento };
            return await Endereco.create(endereco);
        },

        createPedido: async (_, { clienteId }) => {
            return await Pedido.create({ clienteId });
        },

        createProdutosPedido: async (_, { pedidoId, produtoId, quantidade }) => {
            const produtosPedido = { pedidoId, produtoId, quantidade };
            return await ProdutosPedido.create(produtosPedido)
        },
    }
};

const app = new ApolloServer({ typeDefs, resolvers });

app.listen({ port: 3003}).then(({ url }) => console.log(`servidor rodando em ${ url }`))