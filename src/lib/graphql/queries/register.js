import { gql } from "@apollo/client";
export const CREATE_USER = gql`
  mutation CreateCustomer(
    $email: String!
    $firstname: String!
    $password: String!
    $lastname: String!
  ) {
    createCustomerV2(
      input: {
        email: $email
        firstname: $firstname
        lastname: $lastname
        password: $password
      }
    ) {
      customer {
        id
        group_id
        email
        firstname
        lastname
      }
    }
  }
`;

export const GENERATE_CUSTOMER_TOKEN = gql`
  mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;
