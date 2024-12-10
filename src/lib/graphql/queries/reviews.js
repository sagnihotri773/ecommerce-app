import { gql } from "@apollo/client";

export const CREATE_PRODUCT_REVIEWS = gql`
  mutation createProductReview($input: CreateProductReviewInput!) {
    createProductReview(input: $input) {
      review {
        nickname
        summary
        text
        average_rating
        ratings_breakdown {
          name
          value
        }
      }
    }
  }
`;

export const GET_PRODUCT_REVIEW_RATING = gql`
  query productReviewRatingsMetadata {
    productReviewRatingsMetadata {
      items {
        id
        name
        values {
          value_id
          value
        }
      }
    }
  }
`;

export const GET_CUSTOMER_REVIEW_TOKEN = gql`
  query {
    customer {
      reviews {
        items {
          average_rating
          ratings_breakdown {
            name
            value
          }
          nickname
          summary
          
          text
          product {
            name
          }
          created_at
          
        }
      }
    }
  }
`;
