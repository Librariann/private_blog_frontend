import { gql } from "@apollo/client";
import { POST_FIELDS_FRAGMENT } from "./fragment";

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
  query getPostsByParentCategoryId($categoryId: Int!) {
    getPostsByParentCategoryId(categoryId: $categoryId) {
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
        icon
        iconColor
        subCategories {
          id
          categoryTitle
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      ok
      error
      categories {
        id
        categoryTitle
        sortOrder
        icon
        iconColor
        description
        parentCategory {
          id
          categoryTitle
        }
        subCategories {
          id
          categoryTitle
          icon
          iconColor
          sortOrder
          description
          parentCategory {
            id
            categoryTitle
            sortOrder
            icon
            iconColor
            description
          }
          post {
            id
            title
            createdAt
          }
        }
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
        postStatus
        user {
          id
        }
        category {
          id
          categoryTitle
          parentCategory {
            categoryTitle
          }
        }
        hashtags {
          hashtag
        }
        comments {
          id
          annonymousId
          comment
          createdAt
        }
      }
      prevPost {
        id
        title
        createdAt
        readTime
      }
      nextPost {
        id
        title
        createdAt
        readTime
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
  ${POST_FIELDS_FRAGMENT}
  query getPostList {
    getPostList {
      posts {
        ...PostFields
      }
    }
  }
`;

export const GET_ALL_POST_LIST_QUERY = gql`
  ${POST_FIELDS_FRAGMENT}
  query getAllPostList {
    getAllPostList {
      posts {
        ...PostFields
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
          postStatus
          comments {
            id
          }
        }
      }
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      ok
      error
    }
  }
`;

export const TOGGLE_POST_STATUS_MUTATION = gql`
  mutation togglePostStatus($postId: Int!) {
    togglePostStatus(postId: $postId) {
      ok
      error
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: Int!) {
    deletePost(postId: $postId) {
      ok
      error
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($input: CreatePostInput!, $hashtags: [String!]) {
    createPost(input: $input, hashtags: $hashtags) {
      ok
      error
      postId
    }
  }
`;

export const EDIT_POST_MUTATION = gql`
  mutation editPost($input: EditPostInput!, $hashtags: [String!]) {
    editPost(input: $input, hashtags: $hashtags) {
      ok
      error
    }
  }
`;

export const CREATE_CATEGORY_MUTATION = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      ok
      error
    }
  }
`;

export const EDIT_CATEGORY_MUTATION = gql`
  mutation editCategory($input: EditCategoryInput!) {
    editCategory(input: $input) {
      ok
      error
    }
  }
`;

export const DELETE_CATEGORY_MUTATION = gql`
  mutation deleteCategory($categoryId: Int!) {
    deleteCategory(categoryId: $categoryId) {
      ok
      error
    }
  }
`;

export const FIND_ONE_CATEGORY_BY_ID_QUERY = gql`
  query findOneCategoryById($categoryId: Int!) {
    findOneCategoryById(categoryId: $categoryId) {
      ok
      error
      category {
        id
        categoryTitle
        icon
        iconColor
        description
      }
    }
  }
`;

export const GET_COMMENTS_QUERY = gql`
  query getComments {
    getComments {
      ok
      error
      comments {
        id
        comment
        annonymousId
        createdAt
        post {
          id
          title
        }
      }
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteCommentByAdmin($id: Int!) {
    deleteCommentByAdmin(id: $id) {
      ok
      error
    }
  }
`;

export const UPDATE_POST_HITS_MUTATION = gql`
  mutation updatePostHits($postId: Int!) {
    updatePostHits(postId: $postId) {
      ok
      error
    }
  }
`;
