import {
  CreatePostMutation,
  CreatePostMutationVariables,
  DeletePostMutation,
  DeletePostMutationVariables,
  GetAllPopularHashTagsQuery,
  GetAllPopularHashTagsQueryVariables,
  GetAllPostListQuery,
  GetAllPostListQueryVariables,
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetPostListQuery,
  GetPostListQueryVariables,
  TogglePostStatusMutation,
  TogglePostStatusMutationVariables,
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
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
  UPDATE_USER_MUTATION,
  GET_USER_BY_NICKNAME_QUERY,
  GET_ALL_POST_LIST_QUERY,
  TOGGLE_POST_STATUS_MUTATION,
  DELETE_POST_MUTATION,
  CREATE_POST_MUTATION,
} from "@/lib/queries";
import { useQuery } from "@apollo/client";
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from "@/gql/graphql";
import { useMutation } from "@apollo/client";
import { ME_QUERY } from "./useMe";

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

export const useGetAllPostList = () => {
  const { data } = useQuery<GetAllPostListQuery, GetAllPostListQueryVariables>(
    GET_ALL_POST_LIST_QUERY,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      ssr: false, // SSR 비활성화
    }
  );
  return data?.getAllPostList?.posts || null;
};

export const useUpdateUserProfile = (params?: { nickname?: string }) => {
  const [updateUserProfileMutation, { loading: profileUpdateLoading }] =
    useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(
      UPDATE_USER_MUTATION,
      {
        refetchQueries: [
          {
            query: GET_USER_BY_NICKNAME_QUERY,
            variables: { userNickName: params?.nickname || "librarian" },
          },
          {
            query: ME_QUERY,
          },
        ],
        awaitRefetchQueries: true,
      }
    );
  return { updateUserProfileMutation, profileUpdateLoading };
};

export const useTogglePostStatus = () => {
  const [togglePostStatusMutation, { loading: postStatusToggleLoading }] =
    useMutation<TogglePostStatusMutation, TogglePostStatusMutationVariables>(
      TOGGLE_POST_STATUS_MUTATION,
      {
        refetchQueries: [
          {
            query: GET_ALL_POST_LIST_QUERY,
          },
          {
            query: GET_POST_LIST_QUERY,
          },
        ],
        awaitRefetchQueries: true,
      }
    );
  return { togglePostStatusMutation, postStatusToggleLoading };
};

export const useDeletePost = () => {
  const [deletePostMutation, { loading: postDeleteLoading }] = useMutation<
    DeletePostMutation,
    DeletePostMutationVariables
  >(DELETE_POST_MUTATION, {
    refetchQueries: [
      {
        query: GET_ALL_POST_LIST_QUERY,
      },
    ],
    awaitRefetchQueries: true,
  });
  return { deletePostMutation, postDeleteLoading };
};

export const useCreatePost = () => {
  const [createPostMutation, { loading: postLoading }] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(CREATE_POST_MUTATION, {
    update(cache, { data: mutationResult }) {
      if (mutationResult?.createPost.ok) {
        cache.modify({
          fields: {
            getPostList(existing = {}) {
              cache.evict({ fieldName: "getPostList" });
              return existing;
            },
            getCategoriesCounts(existing = {}) {
              cache.evict({ fieldName: "getCategoriesCounts" });
              return existing;
            },
          },
        });
        cache.gc();
      } else {
        console.log(
          "❌ Post creation failed:",
          mutationResult?.createPost.error
        );
      }
    },
  });
  return { createPostMutation, postLoading };
};
