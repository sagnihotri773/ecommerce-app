import { gql } from "@apollo/client";

export const GET_FAQ = gql`
  query GetAllFaqData {
    getFaqData {
      categories_id
      category_name
      faqs {
        questions_id
        categories_id
        questions
        answer
      }
    }
  }
`;
