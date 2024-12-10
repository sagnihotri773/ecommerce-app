import { gql } from "@apollo/client";

export const REQUEST_PASSWORD_RESET_EMAIL = gql`
  mutation ResetPassword($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`;


export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangeCustomerPassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      id
      email
    }
  }
`;

export const REQUEST_PASSWORD = gql`
  mutation RequestPassword(
    $email: String!
    $resetPasswordToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      email: $email
      resetPasswordToken: $resetPasswordToken
      newPassword: $newPassword
    )
  }
`;