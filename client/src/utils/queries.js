const mutation = require('./mutation.js');
import { gql } from '@apollo/client';

const formattedDate = mutation.format_date(new Date());
console.log(formattedDate); // Outputs the formatted date, e.g., "Jul/02/2023"

//queries for cart/checkout/stripe
export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;