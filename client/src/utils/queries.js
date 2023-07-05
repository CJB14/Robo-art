import { gql } from '@apollo/client';
import { format_date } from './mutations';

// const formattedDate = format_date(new Date());
// console.log(formattedDate); // Outputs the formatted date, e.g., "Jul/02/2023"

//queries for cart/checkout/stripe
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
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
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;