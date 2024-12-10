import { gql } from "@apollo/client";

export const GET_WISHLIST_ITEMS = gql`
  query wishList {
    wishlist {
      items_count
      name
      sharing_code
      updated_at

      items {
        id
        qty
        description
        added_at
        product {
        url_rewrites {
            url
            parameters {
              name
              value
            }
          }
          sku
          name
          url_key
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
          price {
            regularPrice {
              amount {
                value
                currency
              }
            }
          }
          thumbnail {
            url
          }
          image {
            url
          }
        }
      }
    }
    customer {
      wishlists {
        id
      }
    }
  }
`;

export const REMOVE_WISHLIST_ITEMS = gql`
  mutation removeProductsFromWishlist(
    $wishlistId: ID!
    $wishlistItemsIds: ID!
  ) {
    removeProductsFromWishlist(
      wishlistId: $wishlistId
      wishlistItemsIds: [$wishlistItemsIds]
    ) {
      wishlist {
        id
        items_count
        items_v2 {
          items {
            id
            quantity
            product {
              uid
              name
              sku
              price_range {
                minimum_price {
                  regular_price {
                    currency
                    value
                  }
                }
                maximum_price {
                  regular_price {
                    currency
                    value
                  }
                }
              }
            }
          }
        }
      }
      user_errors {
        code
        message
      }
    }
  }
`;

export const ADD_PRODUCTS_TO_WISHLIST = gql`
  mutation addProductsToWishlist(
    $wishlistId: ID!
    $sku: String!
    $quantity: Float!
  ) {
    addProductsToWishlist(
      wishlistId: $wishlistId
      wishlistItems: [{ sku: $sku, quantity: $quantity }]
    ) {
      wishlist {
        id
        items_count
        items_v2(currentPage: 1, pageSize: 8) {
          items {
            id
            quantity
            ... on BundleWishlistItem {
              bundle_options {
                values {
                  id
                  label
                  quantity
                }
              }
            }
            product {
              uid
              name
              sku
              price_range {
                minimum_price {
                  regular_price {
                    currency
                    value
                  }
                }
                maximum_price {
                  regular_price {
                    currency
                    value
                  }
                }
              }
            }
          }
        }
      }
      user_errors {
        code
        message
      }
    }
  }
`;

export const ADD_WISHLIST_ITEMS_TO_CART = gql`
  mutation addWishlistItemsToCart($wishlistId: ID!, $wishlistItemIds: [ID!]) {
    addWishlistItemsToCart(
      wishlistId: $wishlistId
      wishlistItemIds: $wishlistItemIds
    ) {
      status
      add_wishlist_items_to_cart_user_errors {
        code
        message
      }
      wishlist {
        id
        items_v2 {
          items {
            id
            product {
              uid
              sku
              name
            }
          }
        }
      }
    }
  }
`;

export const DELETE_WISHLIST = gql`
  mutation ($wishlist_id:String!){
    deleteWishlist(input: { wishlist_id: $wishlist_id }) {
        success
        message
    }
  }
`;
