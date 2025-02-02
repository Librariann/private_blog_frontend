import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from "@/gql/graphql";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

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

const CommentsWrite = () => {
  const [createCommentMutation] = useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CREATE_COMMENT_MUTATION, {
    update(cache, { data: mutationResult }) {
      if (mutationResult?.createComment.ok) {
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
      }
    },
  });
  const {
    query: { id },
  } = useRouter();

  const { register, handleSubmit, reset } = useForm<commentProps>({
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
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          댓글 작성
        </button>
      </div>
    </form>
  );
};

export default CommentsWrite;
