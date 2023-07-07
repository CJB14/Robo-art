// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//     type User {
//         _id: ID!
//         username: String!
//         email: String!
//         password: String!
//         orders: [Order] 
//         products: [Product]
//         # favorites: [Product]
//     }

//     type Order {
//         _id: ID!
//         formattedOrderDate: String!
//         products: [Product]
//         artist: User
//         buyer: User!
//         quantity: Int!
//         price: Float!
//         width: Float!
//         height: Float!
//         payment: PaymentInfo
//         shippingAddress: String
//         billingAddress: String!
//         orderStatus: OrderStatus
//     }

//     type Category {
//         _id: ID!
//         name: String!
//         products: [Product]
//     }

//     type Product {
//         _id: ID!
//        title: String
//        imageURL: String!
//        description: String
//        artist: User!
//     }

//     type Auth {
//         token: ID!
//         user: User
//     }

//     type Query {
//         me: User
//         users: [User]
//         user(username: String!): User
//         products: [Product]
//         product(_id: ID!): Product
//         order(_id: ID!): Order
//         checkout(products: [ID]!): Checkout
//     }

//     type Mutation {
//         login(email: String!, password: String!): Auth
//         addUser(username: String!, email: String!, password: String!): Auth
//         updateUser(username: String, email: String, password: String): User
//         addOrder(products: [ID]!): Order
//         updateProduct(_id: ID!, quantity: Int!): Product
//         deleteUser: User
//         deleteProduct(_id: ID!): Product
//     }

//     type Checkout {
//         session: ID
//     }

//     type PaymentInfo {
//   paymentStatus: PaymentStatus
//   paymentFailureReason: String
// }

// enum PaymentStatus {
//   pending
//   paid
//   failed
// }

// enum OrderStatus {  
//   na
//   initiated
//   pending
//   shipped
// }
// `;

// module.exports = typeDefs;

const { gql } = require('apollo-server-express');
const bcrypt = require('bcrypt');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        orders: [Order] 
        products: [Product]
        # favorites: [Product]
    }

    type Order {
        _id: ID!
        formattedOrderDate: String!
        products: [Product]
        artist: User
        buyer: User!
        quantity: Int!
        price: Float!
        width: Float!
        height: Float!
        payment: PaymentInfo
        shippingAddress: String
        billingAddress: String!
        orderStatus: OrderStatus
    }

    type Category {
        _id: ID!
        name: String!
        products: [Product]
    }

    type Product {
        _id: ID!
       title: String
       imageURL: String!
       description: String
       artist: User!
       hashedPassword: String!
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
        checkout(products: [ID]!): Checkout
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

    type Checkout {
        session: ID
    }

    type PaymentInfo {
  paymentStatus: PaymentStatus
  paymentFailureReason: String
}

enum PaymentStatus {
  pending
  paid
  failed
}

enum OrderStatus {  
  na
  initiated
  pending
  shipped
}
`;

module.exports = typeDefs;
