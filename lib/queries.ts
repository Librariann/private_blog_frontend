import { gql } from "@apollo/client";

export const GET_POST_BY_CATEGORYID_QUERY = gql`
  query getPostListByCategoryId($categoryId: Int!) {
    getPostListByCategoryId(categoryId: $categoryId) {
      ok
      error
      posts {
        id
        title
        contents
        hits
        thumbnailUrl
        createdAt
        readTime
        category {
          id
          categoryTitle
          parentCategoryId
          parentCategoryTitle
        }
        comments {
          comment
        }
        hashtags {
          hashtag
        }
      }
    }
  }
`;

export const GET_POST_BY_PARENT_CATEGORY_ID_QUERY = gql`
  query getPostListByParentCategoryId($categoryId: Int!) {
    getPostListByParentCategoryId(categoryId: $categoryId) {
      ok
      error
      posts {
        id
        title
        contents
        hits
        thumbnailUrl
        createdAt
        readTime
        category {
          id
          categoryTitle
          parentCategoryId
          parentCategoryTitle
        }
        comments {
          comment
        }
        hashtags {
          hashtag
        }
      }
    }
  }
`;

export const GET_CATEGORIES_COUNTS_QUERY = gql`
  query getCategoriesCounts {
    getCategoriesCounts {
      ok
      categoryCounts {
        id
        categoryTitle
        parentCategoryId
        count
        children {
          id
          categoryTitle
          count
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      ok
      categories {
        id
        categoryTitle
        depth
        parentCategoryId
        sortOrder
      }
    }
  }
`;

export const GET_POST_BY_ID_QUERY = gql`
  query getPostById($postId: Int!) {
    getPostById(postId: $postId) {
      ok
      post {
        id
        title
        contents
        hits
        createdAt
        readTime
        thumbnailUrl
        user {
          id
        }
        category {
          id
          categoryTitle
        }
        hashtags {
          hashtag
        }
        comments {
          id
          commentId
          comment
          createdAt
        }
      }
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ok
      error
      commentId
    }
  }
`;

export const GET_POST_LIST_QUERY = gql`
  query getPostList {
    getPostList {
      posts {
        id
        title
        contents
        excerpt
        hits
        thumbnailUrl
        createdAt
        readTime
        category {
          id
          categoryTitle
          parentCategoryTitle
        }
        comments {
          comment
        }
        hashtags {
          hashtag
        }
      }
    }
  }
`;

export const GET_POPULAR_HASHTAG_QUERY = gql`
  query getAllPopularHashTags {
    getAllPopularHashTags {
      hashtags {
        hashtag
        count
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query userProfile($userId: Int!) {
    userProfile(userId: $userId) {
      ok
      error
      user {
        id
        nickname
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_USER_BY_NICKNAME_QUERY = gql`
  query userProfileByNickName($userNickName: String!) {
    userProfileByNickName(userNickName: $userNickName) {
      ok
      error
      user {
        id
        email
        nickname
        profileImage
        introduce
        location
        website
        role
        createdAt
        updatedAt
        posts {
          title
          createdAt
          hits
          comments {
            id
          }
        }
      }
    }
  }
`;
