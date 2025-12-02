import {
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  CreatePostMutation,
  CreatePostMutationVariables,
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables,
  DeleteCommentByAdminMutation,
  DeleteCommentByAdminMutationVariables,
  DeletePostMutation,
  DeletePostMutationVariables,
  EditCategoryMutation,
  EditCategoryMutationVariables,
  FindOneCategoryByIdQuery,
  FindOneCategoryByIdQueryVariables,
  GetAllPopularHashTagsQuery,
  GetAllPopularHashTagsQueryVariables,
  GetAllPostListQuery,
  GetAllPostListQueryVariables,
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetCommentsQuery,
  GetCommentsQueryVariables,
  GetPostListQuery,
  GetPostListQueryVariables,
  TogglePostStatusMutation,
  TogglePostStatusMutationVariables,
  UpdatePostHitsMutation,
  UpdatePostHitsMutationVariables,
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
  EDIT_POST_MUTATION,
  CREATE_CATEGORY_MUTATION,
  EDIT_CATEGORY_MUTATION,
  FIND_ONE_CATEGORY_BY_ID_QUERY,
  DELETE_CATEGORY_MUTATION,
  GET_COMMENTS_QUERY,
  DELETE_COMMENT_MUTATION,
  UPDATE_POST_HITS_MUTATION,
} from "@/lib/queries";
import { useQuery } from "@apollo/client";
import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from "@/gql/graphql";
import { useMutation } from "@apollo/client";
import { ME_QUERY } from "./useMe";

export function useGetCategories() {
  const { data, loading } = useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GET_CATEGORIES, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    ssr: false, // SSR 비활성화
  });

  return {
    categories: data?.getCategories.categories || [],
    categoriesLoading: loading,
  };
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
    refetchQueries: [
      {
        query: GET_POST_LIST_QUERY,
      },
    ],
    awaitRefetchQueries: true,
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

export const useEditPost = ({ postId }: { postId: number }) => {
  const [editPostMutation, { loading: editLoading }] = useMutation(
    EDIT_POST_MUTATION,
    {
      refetchQueries: [
        {
          query: GET_POST_BY_ID_QUERY,
          variables: { postId: Number(postId) },
        },
      ],
      awaitRefetchQueries: true,
    }
  );
  return { editPostMutation, editLoading };
};

export const useCreateCategory = () => {
  const [createCategoryMutation, { loading: categoryLoading }] = useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CREATE_CATEGORY_MUTATION, {
    refetchQueries: [
      {
        query: GET_CATEGORIES,
      },
    ],
    awaitRefetchQueries: true,
  });
  return { createCategoryMutation, categoryLoading };
};

export const useEditCategory = () => {
  const [editCategoryMutation, { loading: categoryLoading }] = useMutation<
    EditCategoryMutation,
    EditCategoryMutationVariables
  >(EDIT_CATEGORY_MUTATION, {
    refetchQueries: [
      {
        query: GET_CATEGORIES,
      },
    ],
    awaitRefetchQueries: true,
  });
  return { editCategoryMutation, categoryLoading };
};

export const useFindOneCategoryById = ({
  categoryId,
}: {
  categoryId: number;
}) => {
  const { data } = useQuery<
    FindOneCategoryByIdQuery,
    FindOneCategoryByIdQueryVariables
  >(FIND_ONE_CATEGORY_BY_ID_QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    ssr: false, // SSR 비활성화
    variables: { categoryId },
  });
  return data?.findOneCategoryById?.category || null;
};

export const useDeleteCategory = () => {
  const [deleteCategoryMutation, { loading: categoryLoading }] = useMutation<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >(DELETE_CATEGORY_MUTATION, {
    refetchQueries: [
      {
        query: GET_CATEGORIES,
      },
    ],
    awaitRefetchQueries: true,
  });
  return { deleteCategoryMutation, categoryLoading };
};

export const useGetComments = () => {
  const { data } = useQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GET_COMMENTS_QUERY,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      ssr: false, // SSR 비활성화
    }
  );
  return data?.getComments?.comments;
};

export const useDeleteCommentByAdmin = () => {
  const [deleteCommentByAdminMutation, { loading: commentLoading }] =
    useMutation<
      DeleteCommentByAdminMutation,
      DeleteCommentByAdminMutationVariables
    >(DELETE_COMMENT_MUTATION, {
      refetchQueries: [
        {
          query: GET_COMMENTS_QUERY,
        },
      ],
      awaitRefetchQueries: true,
    });
  return { deleteCommentByAdminMutation, commentLoading };
};

export const useUpdatePostHits = ({
  postId,
  nickname,
}: {
  postId: number;
  nickname?: string;
}) => {
  const [updatePostHitsMutation] = useMutation<
    UpdatePostHitsMutation,
    UpdatePostHitsMutationVariables
  >(UPDATE_POST_HITS_MUTATION, {
    refetchQueries: [
      {
        query: GET_POST_BY_ID_QUERY,
        variables: { postId: Number(postId) },
      },
      {
        query: GET_USER_BY_NICKNAME_QUERY,
        variables: { userNickName: nickname || "librarian" },
      },
    ],
    awaitRefetchQueries: true,
  });
  return { updatePostHitsMutation };
};
