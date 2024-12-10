import { gql } from "@apollo/client";

export const GET_BLOG_POST = gql`
  query mpBlogPosts($currentPage: Int!,$pageSize:Int!) {
    mpBlogPosts(
      action: "get_post_list"
      pageSize: $pageSize
      currentPage: $currentPage
      
    ) {
      total_count
      pageInfo {
        currentPage
        endPage
        hasNextPage
        hasPreviousPage
        pageSize
        startPage
      }
      items {
        url_key
        allow_comment
        author_id
        author_name
        author_url
        author_url_key
        created_at
        enabled
        image
        import_source
        in_rss
        layout
        meta_description
        meta_keywords
        meta_robots
        meta_title
        name
        post_content
        post_id
        publish_date
        short_description
        store_ids
        updated_at
        url_key
        view_traffic
      }
    }
  }
`;

export const GET_BLOGS_CATEGORY = gql`
  query mpBlogCategories {
    mpBlogCategories(action: "get_category_list") {
      total_count
      pageInfo {
        currentPage
        endPage
        hasNextPage
        hasPreviousPage
        pageSize
        startPage
      }
      items {
        category_id
        children_count
        created_at
        description
        enabled
        import_source
        level
        meta_description
        meta_keywords
        meta_robots
        meta_title
        name
        parent_id
        path
        position
        store_ids
        updated_at
        url_key
      }
    }
  }
`;



export const GET_TAG_LIST = gql`
  query mpBlogTags {
    mpBlogTags(currentPage: 1, pageSize: 10) {
      total_count
      pageInfo {
        currentPage
        endPage
        hasNextPage
        hasPreviousPage
        pageSize
        startPage
      }
      items {
        created_at
        description
        enabled
        import_source
        meta_description
        meta_keywords
        meta_robots
        meta_title
        name
        store_ids
        tag_id
        updated_at
        url_key
      }
    }
  }
`;

export const BLOG_FILTER_BY_URL_KEY = gql`
  query ($url_key: String!) {
    mpBlogPosts(
      action: "get_post_list"
      pageSize: 5
      currentPage: 1
      filter: { url_key: { eq: $url_key } }
    ) {
      total_count
      pageInfo {
        currentPage
        endPage
        hasNextPage
        hasPreviousPage
        pageSize
        startPage
      }
      items {
        allow_comment
        author_id
        author_name
        tags {
          items {
            name
          }
        }
        author_url
        author_url_key
        created_at
        enabled
        image
        import_source
        in_rss
        layout
        meta_description
        meta_keywords
        meta_robots
        meta_title
        name
        post_content
        post_id
        publish_date
        short_description
        store_ids
        updated_at
        url_key
        view_traffic
      }
    }
  }
`;

export const BLOG_FILTER_BY_NAME = gql`
  query ($name: String!) {
    mpBlogPosts(
      action: "get_post_list"
      pageSize: 5
      currentPage: 1
      filter: { name: { eq: $name } }
    ) {
      total_count
      pageInfo {
        currentPage
        endPage
        hasNextPage
        hasPreviousPage
        pageSize
        startPage
      }
      items {
        allow_comment
        author_id
        author_name
        tags {
          items {
            name
          }
        }
        author_url
        author_url_key
        created_at
        enabled
        image
        import_source
        in_rss
        layout
        meta_description
        meta_keywords
        meta_robots
        meta_title
        name
        post_content
        post_id
        publish_date
        short_description
        store_ids
        updated_at
        url_key
        view_traffic
      }
    }
  }
`;

export const GET_BLOG_BY_CATEGORY_URL = gql`
  query ($categoryKey: String!) {
    mpBlogPosts(
      action: "get_post_by_categoryKey"
      categoryKey: $categoryKey
      pageSize: 5
      currentPage: 1
    ) {
      total_count
      pageInfo {
        currentPage
        endPage
        hasNextPage
        hasPreviousPage
        pageSize
        startPage
      }
      items {
        allow_comment
        author_id
        author_name
        author_url
        author_url_key
        created_at
        enabled
        image
        import_source
        in_rss
        layout
        meta_description
        meta_keywords
        meta_robots
        meta_title
        name
        post_content
        post_id
        publish_date
        short_description
        store_ids
        updated_at
        url_key
        view_traffic
      }
    }
  }
`;

export const GET_POST_BY_TOPIC = gql`
  query {
    mpBlogTopics(filter: { enabled: { eq: "1" } }) {
      total_count
      pageInfo {
        currentPage
        endPage
        hasNextPage
        hasPreviousPage
        pageSize
        startPage
      }
      items {
        created_at
        description
        enabled
        import_source
        meta_description
        meta_keywords
        meta_robots
        meta_title
        name
        store_ids
        topic_id
        updated_at
        url_key
      }
    }
  }
`;

export const GET_TOPIC_BY_NAME = gql`
  query ($topicId: Int!) {
    mpBlogPosts(
      action: "get_post_by_topic"
      topicId: $topicId
      pageSize: 5
      currentPage: 1
    ) {
      total_count
      pageInfo {
        currentPage
        endPage
        hasNextPage
        hasPreviousPage
        pageSize
        startPage
      }
      items {
        allow_comment
        author_id

        url_key
        author_name
        author_url
        author_url_key
        created_at
        enabled
        image
        import_source
        in_rss
        layout
        meta_description
        meta_keywords
        meta_robots
        meta_title
        name
        post_content
        post_id
        publish_date
        short_description
        store_ids
        updated_at
        url_key
        view_traffic
      }
    }
  }
`;

export const GET_POST_BY_TAG_NAME = gql`
  query ($tagName: String!) {
    mpBlogPosts(
      action: "get_post_by_tagName"
      tagName: $tagName
      pageSize: 5
      currentPage: 1
    ) {
      total_count
      pageInfo {
        currentPage
        endPage
        hasNextPage
        hasPreviousPage
        pageSize
        startPage
      }
      items {
        allow_comment
        author_id
        author_name
        author_url
        author_url_key
        created_at
        enabled
        image
        import_source
        in_rss
        layout
        meta_description
        meta_keywords
        meta_robots
        meta_title
        name
        post_content
        post_id
        publish_date
        short_description
        store_ids
        updated_at
        url_key
        view_traffic
      }
    }
  }
`;

export const GET_BLOG_MONTHLY_ARCHIEVE = gql`
  query {
    mpBlogMonthlyArchive {
      items {
        label
        quantity
        items {
          allow_comment
          author_id
          author_name
          author_url
          author_url_key
          created_at
          enabled
          image
          import_source
          in_rss
          layout
          meta_description
          meta_keywords
          meta_robots
          meta_title
          name
          post_content
          post_id
          publish_date
          short_description
          store_ids
          updated_at
          url_key
          view_traffic
        }
      }
      total_count
    }
  }
`;

export const GET_BLOG_MONTHLY_ARCHIEVE_BY_MONTH = gql`
query ($monthly:Int!,$year:Int!) {
  mpBlogMonthlyArchive( monthly: $monthly, year: $year){
    
    items {
    
      label
      quantity
      items {
        allow_comment
        author_id
        author_name
        author_url
        author_url_key
        created_at
        enabled
        image
        import_source
        in_rss
        layout
        meta_description
        meta_keywords
        meta_robots
        meta_title
        name
        post_content
        post_id
        publish_date
        short_description
        store_ids
        updated_at
        url_key
        view_traffic
      }
    }
    total_count
  }
}


`