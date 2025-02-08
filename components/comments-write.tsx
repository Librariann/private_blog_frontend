import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from "@/gql/graphql";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "./button";
import { GET_POST_BY_ID_QUERY } from "@/pages/[contents]/[id]";
import { CommentProps } from "./comments";

type commentProps = {
  id: string;
  password: string;
  comment: string;
};

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ok
      error
      commentId
    }
  }
`;

const CommentsWrite = ({
  commentsUpdate,
}: {
  commentsUpdate: (newCommentData: CommentProps) => void;
}) => {
  const {
    query: { id },
  } = useRouter();
  const [createCommentMutation, { loading: commentLoading }] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CREATE_COMMENT_MUTATION, {
    update(cache, { data: mutationResult }) {
      if (mutationResult?.createComment.ok) {
        cache.modify({
          fields: {
            getPostById(existing = {}) {
              cache.evict({ fieldName: "getPostById" });
              return existing;
            },
          },
        });
      }
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<commentProps>({
    mode: "onChange",
  });
  const onSubmit = async (data: commentProps) => {
    if (!id) {
      alert("포스트가 없습니다! 다시 확인해주세요!");
      return;
    }
    const commentResult = await createCommentMutation({
      variables: {
        input: {
          commentId: data.id,
          commentPassword: data.password,
          comment: data.comment,
          postId: +id,
        },
      },
    });

    if (commentResult.data?.createComment.ok) {
      alert("댓글이 작성됐습니다.");
      reset();
      commentsUpdate({
        id: Date.now(),
        commentId: data.id,
        comment: data.comment,
        createdAt: new Date().toISOString(),
      });
    } else {
      alert("댓글 작성에 실패했습니다.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
      <div className="flex gap-4">
        <input
          {...register("id", { required: "아이디를 입력해주세요" })}
          type="text"
          placeholder="아이디"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          {...register("password", { required: "패스워드를 입력해주세요" })}
          type="password"
          placeholder="비밀번호"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <textarea
        {...register("comment", { required: "댓글을 입력해주세요" })}
        placeholder="댓글을 입력하세요"
        className="w-full p-3 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-end">
        <Button
          canClick={isValid && !commentLoading}
          loading={commentLoading}
          actionText="댓글 작성"
        />
      </div>
    </form>
  );
};

export default CommentsWrite;
