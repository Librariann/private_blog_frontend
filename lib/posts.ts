import { createApolloClient } from "@/apollo";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_COUNTS_QUERY,
  GET_POPULAR_HASHTAG_QUERY,
  GET_POST_BY_CATEGORYID_QUERY,
  GET_POST_BY_ID_QUERY,
  GET_POST_BY_PARENT_CATEGORY_ID_QUERY,
  GET_POST_LIST_QUERY,
} from "./queries";
import {
  GetAllPopularHashTagsQuery,
  GetAllPopularHashTagsQueryVariables,
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
  GetPostListByCategoryIdQuery,
  GetPostListByCategoryIdQueryVariables,
  GetPostListByParentCategoryIdQuery,
  GetPostListByParentCategoryIdQueryVariables,
  GetPostListQuery,
  GetPostListQueryVariables,
} from "@/gql/graphql";

const apolloClient = createApolloClient();

export async function getPostsByCategoryId(categoryId: number) {
  try {
    const { data } = await apolloClient.query<
      GetPostListByCategoryIdQuery,
      GetPostListByCategoryIdQueryVariables
    >({
      query: GET_POST_BY_CATEGORYID_QUERY,
      variables: { categoryId },
      fetchPolicy: "cache-first",
    });

    return data.getPostListByCategoryId?.posts || [];
  } catch (error) {
    return [];
  }
}

export async function getPostsByParentCategoryId(categoryId: number) {
  try {
    const { data } = await apolloClient.query<
      GetPostListByParentCategoryIdQuery,
      GetPostListByParentCategoryIdQueryVariables
    >({
      query: GET_POST_BY_PARENT_CATEGORY_ID_QUERY,
      variables: { categoryId },
      fetchPolicy: "cache-first",
    });

    return data.getPostListByParentCategoryId?.posts || [];
  } catch (error) {
    return [];
  }
}

export async function getCategoriesCounts() {
  try {
    const { data } = await apolloClient.query<
      GetCategoriesCountsQuery,
      GetCategoriesCountsQueryVariables
    >({
      query: GET_CATEGORIES_COUNTS_QUERY,
      fetchPolicy: "cache-first",
    });

    return data.getCategoriesCounts?.categoryCounts || [];
  } catch (error) {
    return [];
  }
}

export async function getCategories() {
  try {
    const { data } = await apolloClient.query<
      GetCategoriesQuery,
      GetCategoriesQueryVariables
    >({
      query: GET_CATEGORIES,
      fetchPolicy: "cache-first",
    });

    return data.getCategories?.categories || [];
  } catch (error) {
    return [];
  }
}

export async function getPostById(postId: number) {
  try {
    const apolloClient = createApolloClient();
    const { data } = await apolloClient.query<
      GetPostByIdQuery,
      GetPostByIdQueryVariables
    >({
      query: GET_POST_BY_ID_QUERY,
      variables: { postId },
      fetchPolicy: "cache-first",
    });

    return data.getPostById?.post || null;
  } catch (error) {
    return null;
  }
}

export async function getPostDatas() {
  const { data } = await apolloClient.query<
    GetPostListQuery,
    GetPostListQueryVariables
  >({
    query: GET_POST_LIST_QUERY,
    fetchPolicy: "cache-first",
  });
  return data.getPostList?.posts || [];
}

export async function getPopularHashTagDatas() {
  const { data } = await apolloClient.query<
    GetAllPopularHashTagsQuery,
    GetAllPopularHashTagsQueryVariables
  >({
    query: GET_POPULAR_HASHTAG_QUERY,
    fetchPolicy: "cache-first",
  });
  return data.getAllPopularHashTags?.hashtags || [];
}
