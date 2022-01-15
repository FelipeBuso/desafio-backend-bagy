const { gql, ApolloServer } = require('apollo-server');
const sequelize = require('./database/index');
const Cliente = require('./database/model/Cliente');

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

    type Query {
        clientes: [Cliente]
        cliente(id: ID!): Cliente
    }

    type Mutation {
        createCliente(
            nomeCompleto: String!,
            email: String!,
            cpf: String!,
            dataDeNascimento: String!
        ): Cliente
    }
`;

const resolvers = {
    Query: {
        clientes: () => {
            return Cliente.findAll();
        },

        cliente: (_, { id }) => {
            return Cliente.findByPk(id);
        },
    },

    Mutation: {
        createCliente: (_, { nomeCompleto, email, cpf, dataDeNascimento }) => {
            const novoCliente = { nomeCompleto, email, cpf, dataDeNascimento }
            Cliente.create(novoCliente).then(() => 'cliente inserido');
        }
    }
};

const app = new ApolloServer({ typeDefs, resolvers });

app.listen({ port: 3003}).then(({ url }) => console.log(`servidor rodando em ${ url }`))