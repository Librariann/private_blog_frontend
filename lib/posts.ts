import { createApolloClient } from "@/apollo";
import {
  GET_CATEGORIES,
  GET_POPULAR_HASHTAG_QUERY,
  GET_POST_BY_CATEGORYID_QUERY,
  GET_POST_BY_ID_QUERY,
  GET_POST_BY_PARENT_CATEGORY_ID_QUERY,
  GET_POST_LIST_QUERY,
  GET_USER_BY_NICKNAME_QUERY,
} from "./queries";
import {
  GetAllPopularHashTagsQuery,
  GetAllPopularHashTagsQueryVariables,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
  GetPostListByCategoryIdQuery,
  GetPostListByCategoryIdQueryVariables,
  GetPostListQuery,
  GetPostListQueryVariables,
  GetPostsByParentCategoryIdQuery,
  GetPostsByParentCategoryIdQueryVariables,
  UserProfileByNickNameQuery,
  UserProfileByNickNameQueryVariables,
} from "@/gql/graphql";

export async function getPostsByCategoryId(categoryId: number) {
  try {
    const apolloClient = createApolloClient();
    const { data } = await apolloClient.query<
      GetPostListByCategoryIdQuery,
      GetPostListByCategoryIdQueryVariables
    >({
      query: GET_POST_BY_CATEGORYID_QUERY,
      variables: { categoryId },
      fetchPolicy: "no-cache",
    });

    return data.getPostListByCategoryId?.posts || [];
  } catch (error) {
    return [];
  }
}

export async function getPostsByParentCategoryId(categoryId: number) {
  try {
    const apolloClient = createApolloClient();
    const { data } = await apolloClient.query<
      GetPostsByParentCategoryIdQuery,
      GetPostsByParentCategoryIdQueryVariables
    >({
      query: GET_POST_BY_PARENT_CATEGORY_ID_QUERY,
      variables: { categoryId },
      fetchPolicy: "no-cache",
    });

    return data.getPostsByParentCategoryId?.posts || [];
  } catch (error) {
    return [];
  }
}

export async function getCategories() {
  try {
    const apolloClient = createApolloClient();
    const { data } = await apolloClient.query<
      GetCategoriesQuery,
      GetCategoriesQueryVariables
    >({
      query: GET_CATEGORIES,
      fetchPolicy: "no-cache",
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
      fetchPolicy: "no-cache",
    });

    return data.getPostById || null;
  } catch (error) {
    return null;
  }
}

export async function getPostDatas() {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query<
    GetPostListQuery,
    GetPostListQueryVariables
  >({
    query: GET_POST_LIST_QUERY,
    fetchPolicy: "no-cache",
  });
  return {
    posts: data?.getPostList.posts,
    featuredPost: data?.getPostList.featuredPost,
  };
}

export async function getPopularHashTagDatas() {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query<
    GetAllPopularHashTagsQuery,
    GetAllPopularHashTagsQueryVariables
  >({
    query: GET_POPULAR_HASHTAG_QUERY,
    fetchPolicy: "no-cache",
  });
  return data.getAllPopularHashTags?.hashtags || [];
}

export async function getUserInfo(userNickName: string) {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query<
    UserProfileByNickNameQuery,
    UserProfileByNickNameQueryVariables
  >({
    query: GET_USER_BY_NICKNAME_QUERY,
    variables: { userNickName },
    fetchPolicy: "no-cache",
  });
  return {
    user: data.userProfileByNickName?.user || null,
    hashtagLength: data.userProfileByNickName.hashtagLength || 0,
  };
}
