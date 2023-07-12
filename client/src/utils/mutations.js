import React, { createContext, useContext } from 'react';
import { useProductReducer } from './reducers';
import { gql } from '@apollo/client';

const StoreContext = createContext();

const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!    
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username      
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const TEXT_2_IMG = gql`
  mutation text2img(
    $text: String!
  ) {
    text2img(
      text: $text
    ) {
      imageURL
    }
  }`

export { StoreProvider, useStoreContext };