import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from "@/gql/graphql";
import { CREATE_COMMENT_MUTATION, GET_POST_BY_ID_QUERY } from "./queries";
import { useMutation } from "@apollo/client";

export const createComment = ({ id }: { id: number }) => {
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
