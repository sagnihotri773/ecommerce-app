import { gql } from "@apollo/client";

//Mutations
export const CREATE_EMPTY_CART = gql`
  mutation CreateEmptyCart {
    createEmptyCart(input: { cart_id: null })
  }
`;

export const ADD_PRODUCTS_TO_CART = gql`
  mutation AddProductsToCart(
    $cartId: String!
    $quantity: Float!
    $sku: String!
  ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: { quantity: $quantity, sku: $sku }
    ) {
      cart {
        id
        items {
          id
          product {
            name
            sku
            price {
              regularPrice {
                amount {
                  currency
                  value
                }
              }
            }
            color
          }
          quantity
        }
      }
    }
  }
`;
export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($cart_id: String!, $cart_item_id: Int!) {
    removeItemFromCart(
      input: { cart_id: $cart_id, cart_item_id: $cart_item_id }
    ) {
      cart {
        total_quantity
      }
    }
  }
`;

export const UPDATE_CART_ITEMS = gql`
  mutation UpdateCartItems(
    $cart_id: String!
    $cart_items: [CartItemUpdateInput!]!
  ) {
    updateCartItems(
      input: {
        cart_id: $cart_id
        cart_items: $cart_items
      }
    ) {
      cart {
        id
      }
    }
  }
`;

export const MERGE_CART = gql`
  mutation MergeCarts($source_cart_id: String!) {
    mergeCarts(source_cart_id: $source_cart_id) {
      id
      items {
        product {
          name
          sku
        }
      }
    }
  }
`;

//Queries

export const CUSTOMER_CART = gql`
  query CustomerCart {
    customerCart {
      id
      total_quantity
      prices {
        grand_total {
          value
          currency
        }
      }
      items {
        id
        quantity
        product {
          name
          sku
          image {
            disabled
            label
            position
            url
          }
          price {
            regularPrice {
              amount {
                currency
                value
              }
            }
          }
          color
        }
        quantity
      }
      prices {
        grand_total {
          value
        }
      }
    }
  }
`;

export const CART = gql`
  query Cart($cart_id: String!) {
    cart(cart_id: $cart_id) {
      id
      total_quantity
      items {
        id
        product {
          stock_status
          name
          sku
          image {
            disabled
            label
            position
            url
          }
          price {
            regularPrice {
              amount {
                currency
                value
              }
            }
          }
        }
        quantity
      }
      prices {
        grand_total {
          value
          currency
        }
        applied_taxes {
          amount {
            value
            currency
          }
          label
        }
      }
      email
      billing_address {
        city
        country {
          code
          label
        }
        firstname
        lastname
        postcode
        region {
          code
          label
          region_id
        }
        street
        telephone
      }
      shipping_addresses {
        firstname
        lastname
        street
        postcode
        city
        region {
          code
          label
          region_id
        }
        country {
          code
          label
        }
        telephone
        available_shipping_methods {
          amount {
            currency
            value
          }
          available
          carrier_code
          carrier_title
          error_message
          method_code
          method_title
          price_excl_tax {
            value
            currency
          }
          price_incl_tax {
            value
            currency
          }
        }
        selected_shipping_method {
          amount {
            value
            currency
          }
          carrier_code
          carrier_title
          method_code
          method_title
        }
      }
      itemsV2 {
        total_count
        items {
          id
          uid
          product {
          url_key
          url_suffix
            price_range {
              minimum_price {
                regular_price {
                  currency
                  value
                }
                final_price {
                  currency
                  value
                }
              }
              maximum_price {
                regular_price {
                  currency
                  value
                }
                final_price {
                  currency
                  value
                }
              }
            }
            crosssell_products {
              url_rewrites {
                url
                parameters {
                  name
                  value
                }
              }
              name
              id
              rating_summary
              description {
                html
              }
              sku
              review_count
              price_range {
                minimum_price {
                  regular_price {
                    value
                    currency
                  }
                  final_price{
                      currency
                      value
                  }
                }
              }
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
              image {
                disabled
                label
                position
                url
              }
              price {
                regularPrice {
                  amount {
                    currency
                    value
                  }
                }
              }
            }
            stock_status
            name
            sku
            image {
              disabled
              label
              position
              url
            }
            price {
              regularPrice {
                amount {
                  currency
                  value
                }
              }
            }

            ... on ConfigurableProduct {
              configurable_options {
                attribute_id
                label
                values {
                  value_index
                  label
                }
              }
            }

            ... on BundleProduct {
              items {
                option_id
                title
                required
                options {
                  id
                  label
                  price
                }
              }
            }
          }
          quantity
          ... on ConfigurableCartItem {
            prices {
              price {
                value
              }
            }
            configurable_options {
              configurable_product_option_uid
              configurable_product_option_value_uid
              option_label
              value_label
            }
          }
          ... on BundleCartItem {
            prices {
              price {
                value
              }
            }
            bundle_options {
              id
              uid
              label
              type
              values {
                id
                label
                price
                quantity
              }
            }
          }
        }
        total_count
        page_info {
          page_size
          current_page
          total_pages
        }
      }
      available_payment_methods {
        code
        title
      }
      selected_payment_method {
        code
        title
      }
      applied_coupons {
        code
      }
      prices {
        grand_total {
          value
          currency
        }
        discounts {
          amount {
            value
          }
          applied_to
          label
        }
      }
    }
  }
`;


export const CREATE_CUSTOMER_CART_RAW = gql`
  {
    customerCart {
      id
    }
  }
`;

export const CREATE_GUEST_CART_RAW = gql`
  mutation {
    createGuestCart {
      cart {
        id
      }
    }
  }
`;


export const CLEAR_CUSTOMER_CART = gql`
  mutation ($cart_id: String!) {
    clearCart(input: { cart_id: $cart_id }) {
      success
      message
    }
  }
`;