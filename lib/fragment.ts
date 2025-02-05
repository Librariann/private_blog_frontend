import { gql } from "@apollo/client";

export const POST_FIELDS_FRAGMENT = gql`
  fragment PostFields on Post {
    id
    title
    contents
    excerpt
    hits
    thumbnailUrl
    createdAt
    readTime
    postStatus
    category {
      id
      categoryTitle
      parentCategory {
        id
        categoryTitle
        subCategories {
          id
          categoryTitle
        }
      }
    }
    comments {
      comment
    }
    hashtags {
      hashtag
    }
  }
`;
