import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
{
  categoryList {
    id
    level
    name
    path
    uid
    children_count
    banner_image
    children {
      id
      level
      name
      path
      children_count
      image
      banner_image
      url_path
      url
      children {
        id
        url_path
        image
        level
        name
        path
        uid
        url
        banner_image
        breadcrumbs {
          category_id
          category_name
          category_level
          category_url_key
          category_url_path
        }
        children {
          breadcrumbs {
            category_id
            category_name
            category_level
            category_url_key
            category_url_path
          }
          url
          id
          uid
          level
          name
          path
          image
          url_path
          url_key
          banner_image
        }
      }
    }
  }
}
`

export const GET_CATEGORY_BY_ID = gql`
  query GetCategory($id: Int!) {
    category(id: $id) {
      id
      description
      level
      name
      url_suffix
      banner_image
      children {
      description
        id
        url_path
        image
        banner_image
        level
        name
        path
        uid
        url
      }
      breadcrumbs {
        category_id
        category_name
        category_level
        category_url_key
        category_url_path
      }
    }
  }
`;


export const GET_CAROUSELS_BY_CATEGORY = gql`
  query GetCarouselsByCategory($identifier: String!) {
    getCarouselsByCategoryIdentifier(identifier: $identifier) {
      carousel_id
      image
      mobile_image
      text
      heading
      carousel_category_identifier
    }
  }
`;