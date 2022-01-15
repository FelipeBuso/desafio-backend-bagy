const { gql, ApolloServer } = require('apollo-server');
const sequelize = require('./database/index');
const Cliente = require('./database/model/Cliente');
const Produto = require('./database/model/Produto');

sequelize.sync().then(() => console.log('db está pronto'))

// let users = [{id: 1, nome: 'Felipe', email: 'felipe@teste.com'}];

const typeDefs = gql`
    type Cliente {
        id: ID!
        nomeCompleto: String!
        email: String!
        cpf: String!
        dataDeNascimento: String!,
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


    type Query {
        clientes: [Cliente]
        cliente(id: ID!): Cliente
        produtos: [Produto]
        produto(id: ID!): Produto
    }

    type Mutation {
        createCliente(
            nomeCompleto: String!,
            email: String!,
            cpf: String!,
            dataDeNascimento: String!
        ): Cliente,

        createProduto(
            nome: String!
            imagem: String!
            descricao: String!
            peso: Float!
            preco: Float!
            quantidadeEmEstoque: Int!
        ): Produto
    }
`;

const resolvers = {
    Query: {
        clientes: async () => await Cliente.findAll(),

        cliente: async (_, { id }) => await Cliente.findByPk(id),

        produtos: async () => await Produto.findAll(),

        produto: async (_, { id }) => await Produto.findByPk(id),
    },

    Mutation: {
        createCliente: async (_, { nomeCompleto, email, cpf, dataDeNascimento }) => {
            const cliente = { nomeCompleto, email, cpf, dataDeNascimento }
            return await Cliente.create(cliente);
        },

        createProduto: async (_, { nome, imagem, descricao, peso, preco, quantidadeEmEstoque }) => {
            const produto = { nome, imagem, descricao, peso, preco, quantidadeEmEstoque}
            return await Produto.create(produto);
        }
    }
};

const app = new ApolloServer({ typeDefs, resolvers });

app.listen({ port: 3003}).then(({ url }) => console.log(`servidor rodando em ${ url }`))