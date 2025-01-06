import { createApolloClient } from "@/apollo";
import {
  GET_CATEGORIES,
  GET_CATEGORIES_COUNTS_QUERY,
  GET_POST_BY_CATEGORYID_QUERY,
  GET_POST_BY_ID_QUERY,
  GET_POST_BY_PARENT_CATEGORY_ID_QUERY,
} from "./queries";
import {
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
} from "@/gql/graphql";

export async function getPostsByCategoryId(categoryId: number) {
  const apolloClient = createApolloClient();

  const { data } = await apolloClient.query<
    GetPostListByCategoryIdQuery,
    GetPostListByCategoryIdQueryVariables
  >({
    query: GET_POST_BY_CATEGORYID_QUERY,
    variables: { categoryId },
    fetchPolicy: "network-only",
  });

  return data.getPostListByCategoryId?.posts || [];
}

export async function getPostsByParentCategoryId(categoryId: number) {
  const apolloClient = createApolloClient();

  const { data } = await apolloClient.query<
    GetPostListByParentCategoryIdQuery,
    GetPostListByParentCategoryIdQueryVariables
  >({
    query: GET_POST_BY_PARENT_CATEGORY_ID_QUERY,
    variables: { categoryId },
    fetchPolicy: "network-only",
  });

  return data.getPostListByParentCategoryId?.posts || [];
}

export async function getCategoriesCounts() {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query<
    GetCategoriesCountsQuery,
    GetCategoriesCountsQueryVariables
  >({
    query: GET_CATEGORIES_COUNTS_QUERY,
    fetchPolicy: "network-only",
  });

  return data.getCategoriesCounts?.categoryCounts || [];
}

export async function getCategories() {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >({
    query: GET_CATEGORIES,
    fetchPolicy: "network-only",
  });

  return data.getCategories?.categories || [];
}

export async function getPostById(postId: number) {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query<
    GetPostByIdQuery,
    GetPostByIdQueryVariables
  >({
    query: GET_POST_BY_ID_QUERY,
    variables: { postId },
    fetchPolicy: "network-only",
  });

  return data.getPostById?.post || null;
}
