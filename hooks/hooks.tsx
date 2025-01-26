import { GetCategoriesQuery, GetCategoriesQueryVariables } from "@/gql/graphql";
import {
  CREATE_COMMENT_MUTATION,
  GET_POST_BY_ID_QUERY,
  GET_CATEGORIES,
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
