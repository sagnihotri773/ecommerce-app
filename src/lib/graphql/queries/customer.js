import { gql } from "@apollo/client";

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomerV2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        firstname
        lastname
      }
    }
  }
`;

export const UPDATE_CUSTOMER_EMAIL = gql`
  mutation updateCustomerEmail($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`;

export const UPDATE_CUSTOMER_PHONE = gql`
  mutation UpdateCustomerV2($phone_number: String!) {
    updateCustomerV2(
      input: {
        custom_attributes: [
          { attribute_code: "phone_number", value: $phone_number }
        ]
      }
    ) {
      customer {
        id
      }
    }
  }
`;


export const GET_CUSTOMER_ORDER_BY_ID=gql`
  query Customer($orderId: String!) {
    customer {
      allow_remote_shopping_assistance
      created_at
      date_of_birth
      default_billing
      default_shipping
      dob
      email
      firstname
      gender
      group_id
      id
      is_subscribed
      lastname
      middlename
      prefix
      suffix
      taxvat
      custom_attributes {
        code
        ... on AttributeValue {
          value
        }
        ... on AttributeSelectedOptions {
          selected_options {
            label
            value
          }
        }
      }
      orders(filter: { number: { eq: $orderId } }) {
        total_count
        items {
          carrier
          created_at
          grand_total
          id
          increment_id
          number
          order_date
          order_number
          shipping_method
          status
          total {
            total_tax {
              currency
              value
            }
            base_grand_total {
              currency
              value
            }
            discounts {
              label
              amount {
                currency
                value
              }
            }
            grand_total {
              currency
              value
            }
            shipping_handling {
              total_amount {
                currency
                value
              }
            }
            subtotal {
              currency
              value
            }
            taxes {
              rate
              title
            }
            total_shipping {
              currency
              value
            }
          }
          items {
            product_sku
            product_name
            product_sale_price {
              value
            }
            quantity_ordered
          }
          billing_address {
            city
            company
            country_code
            fax
            firstname
            lastname
            middlename
            postcode
            prefix
            region
            region_id
            street
            suffix
            telephone
            vat_id
          }
          invoices {
            id
          }
          payment_methods {
            name
            type
            additional_data {
              name
              value
            }
          }
          shipping_address {
            city
            company
            country_code
            fax
            firstname
            lastname
            middlename
            postcode
            prefix
            region
            region_id
            street
            suffix
            telephone
            vat_id
          }
          shipments {
            id
            number
          }
        }
        page_info {
          current_page
          page_size
          total_pages
        }
      }
      addresses {
        city
        company
        country_code
        country_id
        customer_id
        default_billing
        default_shipping
        fax
        firstname
        id
        lastname
        middlename
        postcode
        prefix
        region {
         region_code
         region
        }
        region_id
        street
        suffix
        telephone
        vat_id
      }
    }
  }
`

export const GET_FIVE_STAR_REVIEWS = gql`
  query GetFiveStarReviews($limit: Int) {
    fiveStarReviews(limit: $limit) {
      title
      detail
      rating
      created_at
      product_name
      nickname
    }
  }
`;


export const DELETE_CUSTOMER_ADDRESS = gql`
  mutation deleteCustomerAddress($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`;