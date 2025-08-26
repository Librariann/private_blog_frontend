import {
  GetAllPopularHashTagsQuery,
  GetAllPopularHashTagsQueryVariables,
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetPostListQuery,
  GetPostListQueryVariables,
  UserProfileQuery,
  UserProfileQueryVariables,
} from "@/gql/graphql";
import {
  CREATE_COMMENT_MUTATION,
  GET_POST_BY_ID_QUERY,
  GET_CATEGORIES,
  GET_POST_LIST_QUERY,
  GET_POPULAR_HASHTAG_QUERY,
  GET_CATEGORIES_COUNTS_QUERY,
  GET_USER_QUERY,
} from "@/lib/queries";
import { useQuery } from "@apollo/client";
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from "@/gql/graphql";
import { useMutation } from "@apollo/client";

export function useGetCategories() {
  const { data } = useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(
    GET_CATEGORIES,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      ssr: false, // SSR 비활성화
    }
  );

  return data;
}

export function useGetCategoryCounts() {
  const { data, loading } = useQuery<
    GetCategoriesCountsQuery,
    GetCategoriesCountsQueryVariables
  >(GET_CATEGORIES_COUNTS_QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    countsData: data?.getCategoriesCounts.categoryCounts,
    countsLoading: loading,
  };
}

export const useCreateComment = ({ id }: { id: number }) => {
  const [createCommentMutation, { loading: commentLoading }] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CREATE_COMMENT_MUTATION, {
    refetchQueries: [
      {
        query: GET_POST_BY_ID_QUERY,
        variables: { postId: Number(id) },
      },
    ],
    awaitRefetchQueries: true,
  });
  return { createCommentMutation, commentLoading };
};

export const useGetPostList = () => {
  const { data } = useQuery<GetPostListQuery, GetPostListQueryVariables>(
    GET_POST_LIST_QUERY,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      ssr: false, // SSR 비활성화
    }
  );
  return data?.getPostList?.posts || [];
};

export const useGetPopularHashTagList = () => {
  const { data } = useQuery<
    GetAllPopularHashTagsQuery,
    GetAllPopularHashTagsQueryVariables
  >(GET_POPULAR_HASHTAG_QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    ssr: false, // SSR 비활성화
  });
  return data?.getAllPopularHashTags.hashtags || [];
};

export const useGetUserInfo = ({ id }: { id: number }) => {
  const { data } = useQuery<UserProfileQuery, UserProfileQueryVariables>(
    GET_USER_QUERY,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      ssr: false, // SSR 비활성화
      variables: { userId: id },
    }
  );
  return data?.userProfile?.user || null;
};
