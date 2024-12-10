// query

import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts(
    $search: String!
    $filters: ProductAttributeFilterInput!
    $pageSize: Int!
    $currentPage: Int!
    $sortField: ProductAttributeSortInput!
  ) {
    products(
      search: $search
      filter: $filters
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sortField
    ) {
      total_count
        aggregations {
        attribute_code
        count
        label
        options {
          label
          value
          count
        }
      }
      sort_fields{
        default
        options{
            label
            value
            __typename
        }
      }
      items {
        related_products {
          uid
          id
          name
          ... on ConfigurableProduct {
          configurable_options {
            id
            attribute_id_v2
            label
            position
            use_default
            attribute_code
            values {
              value_index
              label
            }
            product_id
          }
          variants {
          attributes {
            uid
            label
            code
            value_index
          }
            product {
              id
              name
              sku
              price {
                regularPrice {
                  amount {
                    value
                    currency
                  }
                }
              }
            }
          }
        }
          url_rewrites {
            url
            parameters {
              name
              value
            }
          }
        }
        upsell_products {
          id
          uid
          name
          sku
          url_rewrites {
            url
            parameters {
              name
              value
            }
          }
          image {
            url
          }
            thumbnail {
            url
          }
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
          rating_summary
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
        name
        sku
        id
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
               final_price {
                        currency
                        value
                    }
            discount {
              amount_off
              percent_off
            }
          }
        }
        rating_summary
        description {
          html
        }
        meta_title
        meta_description
        meta_keyword
        review_count
        stock_status
        swatch_image
        image {
          url
        }
           thumbnail {
            url
          }
        media_gallery {
          url
          label
        }
        url_key
        url_rewrites {
          url
          parameters {
            name
            value
          }
        }
        reviews {
          items {
            nickname
            summary
            text
            created_at
            average_rating
          }
        }
        attribute_set_id
        ... on ConfigurableProduct {
          configurable_options {
            id
            attribute_id_v2
            label
            position
            use_default
            attribute_code
            values {
              value_index
              label
            }
            product_id
          }
          variants {
          attributes {
            uid
            label
            code
            value_index
          }
            product {
              id
              name
              sku
              price {
                regularPrice {
                  amount {
                    value
                
                  }
                }
              }
                
            }
          }
        }
        ... on SimpleProduct {
          price {
            regularPrice {
              amount {
                value
                currency
              }
            }
          }
        }
        ... on BundleProduct {
          items {
            option_id
            title
            type
            options {
              id
              label
              quantity
              can_change_quantity
              product {
                sku
                name
                price {
                  regularPrice {
                    amount {
                      value
                      currency
                    }
                  }
                }
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
              }
            }
          }
        }
        ... on GroupedProduct {
          items {
            position
            product {
              sku
              name
              price {
                regularPrice {
                  amount {
                    value
                    currency
                  }
                }
              }
              
            }
          }
        }
      }
      page_info {
        page_size
        current_page
      }
    }
  }
`;


export const GET_PRODUCTS_BUNDLE_PRODUCT = gql`
  query products($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        sku
        __typename
        uid
        name
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
        rating_summary
        description {
          html
        }
        review_count
        stock_status
        swatch_image
        image {
          url
        }
           thumbnail {
            url
          }
        media_gallery {
          url
          label
        }
        url_key

        reviews {
          items {
            nickname
            summary
            text
            created_at
            average_rating
          }
        }
        attribute_set_id
        ... on ConfigurableProduct {
          configurable_options {
            id
            attribute_id_v2
            label
            position
            use_default
            attribute_code
            values {
              value_index
              label
            }
            product_id
          }
          variants {
            product {
              id
              name
              sku
            }
          }
        }
        ... on BundleProduct {
          dynamic_sku
          dynamic_price
          dynamic_weight
          price_view
          ship_bundle_items
          items {
            uid
            title
            required
            type
            position
            sku
            options {
              uid
              quantity
              position
              is_default
              price
              price_type
              can_change_quantity
              label
              product {
                uid
                name
                sku
                __typename
              }
            }
          }
        }
      }
    }
  }
`;
export const GET_PRODUCT = gql`
  query GetBundleProduct($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      aggregations {
        attribute_code
        count
        label
        options {
          label
          value
          count
        }
      }

      items {
        categories {
         name
            level
          url_path
          url_suffix
          breadcrumbs {
            category_id
            category_name
            category_level
            category_url_key
            category_url_path
          }
        }

        reviews {
          items {
            nickname
            summary
            text
            created_at
            average_rating
          }
        }

        related_products {
          description {
            html
          }
            thumbnail{
            url
            }
          ... on ConfigurableProduct {
            configurable_options {
              id
              attribute_id_v2
              label
              position
              use_default
              attribute_code
              values {
                value_index
                label
              }
              product_id
            }
            variants {
              attributes {
                uid
                label
                code
                value_index
              }
              product {
                id
                name
                sku
                price {
                  regularPrice {
                    amount {
                      value
                      currency
                    }
                  }
                }
              }
            }
          }

          id
          uid
          sku
          url_rewrites {
            url
            parameters {
              name
              value
            }
          }

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

          rating_summary
          image {
            url
          }
          name
        }

        stock_status
        sku
        name
        description {
          html
        }

        meta_title
        meta_description
        meta_keyword

        image {
          url
        }

        media_gallery {
          url
          label
        }

        rating_summary

        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }

        ... on SimpleProduct {
        
          price {
            regularPrice {
              amount {
                value
                currency
              }
            }
          }
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
        }

        ... on ConfigurableProduct {
          configurable_options {
            attribute_id
            attribute_code
            label
            values {
              value_index
              label
            }
          }
          variants {
            attributes {
              uid
              label
              code
              value_index
            }
            product {
              sku
              name
              price {
                regularPrice {
                  amount {
                    value
                    currency
                  }
                }
              }
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
            }
          }
        }

        ... on BundleProduct {
          items {
            option_id
            title
            type
            options {
              id
              label
              quantity
              can_change_quantity
              product {
                sku
                name
                price {
                  regularPrice {
                    amount {
                      value
                      currency
                    }
                  }
                }
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
              }
            }
          }
        }

        ... on GroupedProduct {
          items {
            qty
            position
            product {
              sku
              name
              price {
                regularPrice {
                  amount {
                    value
                    currency
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const DOWNLOADABLE_PRODUCT = gql`
  query DownloadableProduct($url_key: String!) {
    products(filter: { url_key: { eq: $url_key } }) {
      items {
        sku
        name
        description {
          html
        }
        media_gallery {
          url
          label
          position
          disabled
        }
        image {
          url
        }
        stock_status
        ... on CustomizableProductInterface {
          options {
            uid
            title
            required
            sort_order
            option_id
            ... on CustomizableDropDownOption {
              value {
                option_type_id
                price
                price_type
                sku
                sort_order
                title
              }
            }
            ... on CustomizableRadioOption {
              value {
                option_type_id
                price
                price_type
                sku
                sort_order
                title
              }
            }
            ... on CustomizableCheckboxOption {
              value {
                option_type_id
                price
                price_type
                sku
                sort_order
                title
              }
            }
          }
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`;


// Add to cart mutations
export const ADD_SIMPLE_PRODUCT_TO_CART = gql`
  mutation AddSimpleProductToCart(
    $cartId: String!
    $sku: String!
    $quantity: Float!
  ) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [{ data: { quantity: $quantity, sku: $sku } }]
      }
    ) {
      cart {
        items {
          id
          product {
            name
          }
          quantity
        }
      }
    }
  }
`;

export const ADD_CONFIGURABLE_PRODUCTS_TO_CART = gql`
  mutation AddConfigurableProductsToCart(
    $cartId: String!
    $parentSku: String!
    $sku: String!
    $quantity: Float!
  ) {
    addConfigurableProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [
          { parent_sku: $parentSku, data: { quantity: $quantity, sku: $sku } }
        ]
      }
    ) {
      cart {
        itemsV2 {
          items {
            uid
            quantity
            product {
              name
              sku
            }
            ... on ConfigurableCartItem {
              configurable_options {
                option_label
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
      }
    }
  }
`;
export const ADD_BUNDLE_PRODUCT_TO_CART = gql`
  mutation AddBundleProductToCart(
    $cartId: String!
    $sku: String!
    $quantity: Float!
    $bundleOptions: [BundleOptionInput!]!
  ) {
    addBundleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: [
          {
            data: { quantity: $quantity, sku: $sku }
            bundle_options: $bundleOptions
          }
        ]
      }
    ) {
      cart {
        items {
          id
          product {
            name
          }
          quantity
        }
      }
    }
  }
`;

export const ADD_GROUPED_PRODUCT_TO_CART = gql`
  mutation addProductsToCart($cartId: String!, $items: [CartItemInput!]!) {
    addProductsToCart(cartId: $cartId, cartItems: $items) {
      cart {
        id
        items {
          id
          product {
            name
          }
          quantity
        }
      }
    }
  }
`;

export const GET_ATTRIBUTES = gql`
  query GetProductAttributes {
    products(filter: {}) {
      aggregations {
        attribute_code
        label
        options {
          label
          value
        }
      }
    }
  }
`;

export const ROUTE = gql`
  query route($url: String!) {
    route(url: $url) {
      __typename
      relative_url
      redirect_code
      type
      
      ... on SimpleProduct {
      image{
      url
      }
        id
        sku
        url_key
        uid
        meta_title      
        meta_description
        meta_keyword
        url_rewrites {
          url
          parameters {
            name
            value
          }
        }
      }
      
      ... on CmsPage {
        identifier
        url_key
        title
        content
        page_layout
        meta_title
        meta_description
        meta_keywords
        relative_url
        redirect_code
        type
      }
      
      ... on ConfigurableProduct {
       image{
            url
        }
        sku
        url_key
        id
        uid
        meta_title      
        meta_description
        meta_keyword   
        url_rewrites {
          url
          parameters {
            name
            value
          }
        }
      }
      
      ... on BundleProduct {
      image{
            url
        }
        sku
        url_key
        id
        uid
        meta_title      
        meta_description
        meta_keyword   
        url_rewrites {
          url
          parameters {
            name
            value
          }
        }
      }
      
      ... on GroupedProduct {
      image{
            url
        }
        sku
        url_key
        id
        uid
        meta_title      
        meta_description
        meta_keyword   
      }
      
      ... on CategoryInterface {
        url_key
        id
        uid
        meta_title      
        meta_description
        meta_keywords   
      }
    }
  }
`;

export const SEARCH_PRODUCT = gql`
  query GetProducts($search: String!) {
    products(search: $search) {
      total_count
      items {
        name
        sku
        id
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
        rating_summary
        description {
          html
        }
        review_count
        stock_status
        swatch_image
        image {
          url
        }
          thumbnail{
          url
          }
        media_gallery {
          url
          label
        }
        url_key
        url_rewrites {
          url
          parameters {
            name
            value
          }
        }

        reviews {
          items {
            nickname
            summary
            text
            created_at
            average_rating
          }
        }
        attribute_set_id
        ... on ConfigurableProduct {
        thumbnail{
          url
          }
          configurable_options {
            id
            attribute_id_v2
            label
            position
            use_default
            attribute_code
            values {
              value_index
              label
            }
            product_id
          }
          variants {
            product {
              id
              name
              sku
            }
          }
        }
      }
      page_info {
        page_size
        current_page
      }
    }
  }
`;


export const GET_PRODUCT_WITH_PRICE_TIERS = gql`
  query GetProductWithPriceTiers($search: String!) {
    products(search: $search) {
      items {   # Corrected typo 'iitems' to 'items'
        id
        price_range {
          minimum_price {
            regular_price {
              value
            }
            final_price {
              value
            }
          }
          maximum_price {
            regular_price {
              value
            }
            final_price {
              value
            }
          }
        }
        tier_prices {
          qty
          value
        }
        price_tiers {
          quantity
          discount {
            amount_off
            percent_off
          }
          final_price {
            value
          }
        }
      }
    }
  }
`;
 