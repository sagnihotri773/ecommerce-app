import { gql } from "@apollo/client";

export const CONTACT_US = gql`
  mutation contactUs(
    $comment: String!
    $email: String!
    $telephone: String!
    $name: String!
  ) {
    contactUs(
      input: {
        comment: $comment
        email: $email
        telephone: $telephone
        name: $name
      }
    ) {
      status
    }
  }
`;
