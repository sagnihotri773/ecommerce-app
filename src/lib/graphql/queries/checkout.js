import { gql } from "@apollo/client";

export const SET_SHIPPING_ADDRESSES = gql`
  mutation SetShippingAddressesOnCart(
    $cart_id: String!
    $city: String!
    $country_code: String!
    $firstname: String!
    $lastname: String!
    $postcode: String!
    $region: String
    $region_id: Int
    $save_in_address_book: Boolean!
    $street: [String]!
    $telephone: String!
  ) {
    setShippingAddressesOnCart(
      input: {
        cart_id: $cart_id
        shipping_addresses: {
          address: {
            firstname: $firstname
            lastname: $lastname
            street: $street
            city: $city
            region_id: $region_id
            region: $region
            postcode: $postcode
            country_code: $country_code
            telephone: $telephone
            save_in_address_book: $save_in_address_book
          }
          customer_notes: null
        }
      }
    ) {
      cart {
        email
        id
        is_virtual
        total_quantity
        available_payment_methods {
          code
          title
        }
        selected_payment_method {
          code
          purchase_order_number
          title
        }
        shipping_addresses {
          city
          region {
            code
            label
            region_id
          }
          company
          customer_notes
          firstname
          items_weight
          lastname
          pickup_location_code
          postcode
          street
          telephone
          available_shipping_methods {
            available
            carrier_code
            carrier_title
            error_message
            method_code
            method_title
          }
        }
      }
    }
  }
`;

export const SET_BILLING_ADDRESSES = gql`
  mutation SetBillingAddressOnCart(
    $cart_id: String!
    $city: String!
    $country_code: String!
    $firstname: String!
    $lastname: String!
    $postcode: String!
    $region: String
    $region_id: Int
    $save_in_address_book: Boolean!
    $street: [String]!
    $telephone: String!
  ) {
    setBillingAddressOnCart(
      input: {
        cart_id: $cart_id
        billing_address: {
          address: {
            city: $city
            country_code: $country_code
            firstname: $firstname
            lastname: $lastname
            postcode: $postcode
            region_id: $region_id
            region: $region
            save_in_address_book: $save_in_address_book
            street: $street
            telephone: $telephone
          }
          same_as_shipping: null
          use_for_shipping: null
        }
      }
    ) {
      cart {
        email
        id
        is_virtual
        total_quantity
        items {
          id
          quantity
          uid
          product {
            attribute_set_id
            canonical_url
            color
            country_of_manufacture
            created_at
            gift_message_available
            id
            meta_description
            meta_keyword
            meta_title
            name
            new_from_date
            new_to_date
            only_x_left_in_stock
            options_container
            rating_summary
            review_count
            sku
            special_from_date
            special_price
            special_to_date
            stock_status
            swatch_image
            type_id
            uid
            updated_at
            url_key
            url_path
            url_suffix
          }
        }
      }
    }
  }
`;

export const SET_SHIPPING_METHODS = gql`
  mutation SetShippingMethodsOnCart($cart_id: String!,$method_code:String!,$carrier_code:String!) {
    setShippingMethodsOnCart(
      input: {
        cart_id: $cart_id
        shipping_methods: { method_code: $method_code, carrier_code: $carrier_code }
      }
    ) {
      cart {
        email
        id
        is_virtual
        total_quantity
        shipping_addresses {
          city
          company
          customer_notes
          firstname
          items_weight
          lastname
          pickup_location_code
          postcode
          street
          telephone
          selected_shipping_method {
            carrier_code
            carrier_title
            method_code
            method_title
          }
        }
      }
    }
  }
`;

export const SET_PAYMENT_METHOD_AND_PLACE_ORDER = gql`
  mutation SetPaymentMethodAndPlaceOrder(
    $cart_id: String!
    $payment_id: String!
  ) {
    setPaymentMethodAndPlaceOrder(
      input: {
        cart_id: $cart_id
        payment_method: {
          stripe_payments: { payment_method: true, payment_method: $payment_id }
          code: "checkmo"
        }
      }
    ) {
      order {
        client_secret
        order_id
        order_number
      }
    }
  }
`;

export const SET_GUEST_EMAIL_ON_CART = gql`
  mutation SetGuestEmailOnCart($cart_id: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cart_id, email: $email }) {
      cart {
        email
      }
    }
  }
`;

export const APPLY_COUPON_TO_CART = gql`
  mutation applyCouponToCart($cart_id: String!, $coupon_code: String!) {
    applyCouponToCart(input: { cart_id: $cart_id, coupon_code: $coupon_code }) {
      cart {
        itemsV2 {
          items {
            product {
              name
            }
            quantity
          }
          total_count
          page_info {
            page_size
            current_page
            total_pages
          }
        }
        applied_coupons {
          code
        }
        prices {
          grand_total {
            value
            currency
          }
        }
      }
    }
  }
`;

export const REMOVE_COUPON_FROM_CART = gql`
  mutation removeCouponFromCart($cart_id: String!) {
    removeCouponFromCart(input: { cart_id: $cart_id }) {
      cart {
        itemsV2 {
          items {
            product {
              name
            }
            quantity
          }
          total_count
          page_info {
            page_size
            current_page
            total_pages
          }
        }
        applied_coupons {
          code
        }
        prices {
          grand_total {
            value
            currency
          }
        }
      }
    }
  }
`;
export const GET_CUSTOMER_DATA = gql`
  query Customer($currentPage: Int!) {
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
      orders(
        sort: { sort_field: CREATED_AT, sort_direction: DESC }
        pageSize: 4
        currentPage: $currentPage
      ) {
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
          }
          items {
            product_sku
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
      wishlists {
        id
      }
    }
  }
`;

export const GET_DOWNLOADABLE_PRODUCTS = gql`
  query {
    customerDownloadableProducts {
      items {
        date
        download_url
        order_increment_id
        remaining_downloads
        status
      }
    }
  }
`;


export const ADD_CUSTOMER_ADDRESS = gql`
  mutation AddCustomerAddress(
    $region: String
    $region_id: Int
    $country_code: CountryCodeEnum!
    $street: [String!]!
    $telephone: String!
    $postcode: String!
    $city: String!
    $firstname: String!
    $lastname: String!
    $default_shipping: Boolean!
    $default_billing: Boolean!
  ) {
    createCustomerAddress(
      input: {
        region: {
         region: $region
         region_id: $region_id
        }
        country_code: $country_code
        street: $street
        telephone: $telephone
        postcode: $postcode
        city: $city
        firstname: $firstname
        lastname: $lastname
        default_shipping: $default_shipping
        default_billing: $default_billing
      }
    ) {
      id
      region {
        region
        region_code
      }
      country_code
      street
      telephone
      postcode
      city
      default_shipping
      default_billing
    }
  }
`;

export const UPDATE_CUSTOMER_ADDRESS = gql`
  mutation UpdateCustomerAddress(
    $id: Int!
    $country_code: CountryCodeEnum!
    $street: [String!]!
    $telephone: String!
    $postcode: String!
    $city: String!
    $firstname: String!
    $lastname: String!
    $default_shipping: Boolean!
    $default_billing: Boolean!
    $region: String
    $region_id: Int
  ) {
    updateCustomerAddress(
      id: $id
      input: {
        country_code: $country_code
        street: $street
        telephone: $telephone
        postcode: $postcode
        city: $city
        firstname: $firstname
        lastname: $lastname
         region: {
          region: $region
          region_id: $region_id
        }
        default_shipping: $default_shipping
        default_billing: $default_billing
      }
    ) {
      id
    }
  }
`;

export const CREATE_PAYPAL_EXPRESS_TOKEN = gql`
  mutation createPaypalExpressToken($cart_id: String!) {
    createPaypalExpressToken(
      input: {
        cart_id: $cart_id
        code: "paypal_express"
        express_button: true
        urls: {
          return_url: "paypal/shop-checkout"
          cancel_url: "paypal/action/cancel.html"
        }
      }
    ) {
      token
      paypal_urls {
        start
        edit
      }
    }
  }
`;

export const SET_PAYMENT_METHOD_ONCART = gql`
  mutation setPaymentMethodOnCart(
    $cart_id: String!
    $payer_id: String!
    $token: String!
  ) {
    setPaymentMethodOnCart(
      input: {
        cart_id: $cart_id
        payment_method: {
          code: "paypal_express"
          paypal_express: { payer_id: $payer_id, token: $token }
        }
      }
    ) {
      cart {
        selected_payment_method {
          code
          title
        }
      }
    }
  }
`;

export const PLACE_ORDER_PAYPAL = gql`
  mutation placeOrder($cart_id: String!) {
    placeOrder(input: { cart_id: $cart_id }) {
      orderV2 {
        number
        token
      }
      errors {
        message
        code
      }
    }
  }
`;

export const GET_GUEST_ORDER_DETAIL = gql`
  query GetGuestOrderDetail(
    $number: String!
    $email: String!
    $postcode: String!
  ) {
    guestOrder(input: { number: $number, email: $email, postcode: $postcode }) {
      status
      order_date
      number
      token
      shipping_method
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
      billing_address {
        firstname
        lastname
        city
        region
        region_id
        street
        postcode
        country_code
        telephone
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
        firstname
        lastname
        city
        region
        region_id
        street
        postcode
        country_code
        telephone
      }
      items {
        product_sku
        product_name
        product_sale_price {
          value
        }
        quantity_ordered
      }
    }
  }
`;

export const LIST_PAYMENT_METHODS = gql`
mutation {
  listStripePaymentMethods {
    id
    created
    type
    fingerprint
    label
    icon
    cvc
    brand
    exp_month
    exp_year
  }
}
`;