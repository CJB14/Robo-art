const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        orders: [Order]
    }

    type Order {
        _id: ID!
        purchaseDate: String!
        products: [Product]
    }

    type Product {
        _id: ID!
        name: String!
        description: String
        price: Float!
        quantity: Int!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        products: [Product]
        product(_id: ID!): Product
        order(_id: ID!): Order
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        addOrder(products: [ID]!): Order
        updateProduct(_id: ID!, quantity: Int!): Product
        deleteUser: User
        deleteProduct(_id: ID!): Product
    }

    # type Checkout {
    #     session: ID
    # }
`;

module.exports = typeDefs;