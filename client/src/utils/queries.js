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

export const GET_PRODUCTS = gql`
   query GetProducts {
    products {
      _id
      title
      description
      imageURL
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      username
        products {
          _id
          title
          description
          imageURL
        }
      }
    }
`;

export const GET_USER_PRODUCTS = gql`
query GetUserProducts {
    userProducts {
      _id
      title
      imageURL
      description
    }
  }
`;

// export const QUERY_PRODUCTS = gql`
//   query getProducts($category: ID) {
//     products(category: $category) {
//       _id
//       name
//       description
//       price
//       quantity
//       category {
//       name
//       }
//     }
//   }
// `;
