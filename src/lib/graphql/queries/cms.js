
import { gql } from "@apollo/client";

export const CMS = gql`
  query cmsPage ($cmsPage:String!){
     cmsPage(identifier: $cmsPage) {
      identifier
      url_key
      title
      content
      content_heading
      page_layout
      meta_title
      meta_description
      meta_keywords
    }
  }
`;
