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
