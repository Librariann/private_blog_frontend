import { gql } from "@apollo/client";

export const POST_CARD_FIELDS_FRAGMENT = gql`
  fragment PostCardFields on Post {
    id
    title
    excerpt
    hits
    thumbnailUrl
    createdAt
    readTime
    category {
      id
      categoryTitle
      parentCategory {
        id
        categoryTitle
      }
    }
    hashtags {
      hashtag
    }
  }
`;

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
