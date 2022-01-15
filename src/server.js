const { gql, ApolloServer } = require('apollo-server');
const sequelize = require('./database/index');
const Cliente = require('./database/model/Cliente');
const Endereco = require('./database/model/Endereco');
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


    type Query {
        clientes: [Cliente]
        cliente(id: ID!): Cliente
        produtos: [Produto]
        produto(id: ID!): Produto
        enderecos: [Endereco]
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
    }
`;

const resolvers = {
    Query: {
        clientes: async () => await Cliente.findAll(),

        cliente: async (_, { id }) => await Cliente.findByPk(id),

        produtos: async () => await Produto.findAll(),

        produto: async (_, { id }) => await Produto.findByPk(id),

        enderecos: async (_, { id }) => await Endereco.findAll(),
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
        }
    }
};

const app = new ApolloServer({ typeDefs, resolvers });

app.listen({ port: 3003}).then(({ url }) => console.log(`servidor rodando em ${ url }`))