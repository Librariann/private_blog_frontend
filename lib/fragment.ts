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
    updatedAt
    readTime
    postStatus
    featureYn
    category {
      id
      categoryTitle
      parentCategory {
        id
        categoryTitle
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
