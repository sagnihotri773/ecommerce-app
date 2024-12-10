import { gql } from "@apollo/client";

export const STORE_CONFIG = gql`
  query availableStores {
    availableStores(useCurrentGroup: true) {
      store_code
      store_name
      is_default_store
      store_group_code
      is_default_store_group
      locale
      default_country
      base_currency_code
      default_display_currency_code
      timezone
      weight_unit
      base_url
      base_link_url
      base_static_url
      base_media_url
      secure_base_url
      secure_base_link_url
      secure_base_static_url
      secure_base_media_url
      default_title
      default_keywords
      welcome
      front
      cms_home_page
      no_route
      cms_no_route
      cms_no_cookies
      show_cms_breadcrumbs
      product_url_suffix
      category_url_suffix
      title_separator
      list_mode
      grid_per_page_values
      list_per_page_values
      grid_per_page
      list_per_page
      catalog_default_sort_by
      head_shortcut_icon
      default_title
      title_prefix
      title_suffix
      default_description
      default_keywords
      head_includes
      demonotice
      header_logo_src
      logo_width
      logo_height
      welcome
      logo_alt
      absolute_footer
      copyright
      
      layoutSetting {
        product_card
        cart_drawer
        checkout
        header
        product_gallery
        shop_page_sidebar
        shop_cart
        product_other_details_tab
        customizable_options
        category_cards
        product_summary
      }
      
      staticContent {
        header {
          topContent
          bottomContent
        }
        footer {
          topContent
          middleSection1
          middleSection2
          middleSection3
          bottomContent
        }
        productPage {
          topContent
          afterMainContent
          bottomContent
        }
        categoryPage {
          topContent
          sidebarBlock
          bottomContent
        }
        contactUs {
          topContent
          bottomContent
        }
        cartPage {
          topContent
          bottomContent
        }
        customerAccount {
          topContent
          bottomContent
        }
        checkoutPage {
          topContent
          bottomContent
        }
      }
    }
  }
`;

export const GetCurrency = gql`
  query {
    currency {
        base_currency_code
        base_currency_symbol
        default_display_currency_code
        default_display_currency_symbol
        available_currency_codes
        exchange_rates {
            currency_to
            rate
        }
    }
  }
`