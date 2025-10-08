import {
  CreateCommentMutation,
  CreateCommentMutationVariables,
} from "@/gql/graphql";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "./button";
import { GET_POST_BY_ID_QUERY } from "@/pages/[contents]/[id]";
import ConfirmModal from "./modal/confirm-modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLoadingStore } from "@/stores/useLoadingStore";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setGlobalLoading } = useLoadingStore();
  const {
    query: { id },
  } = useRouter();
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

  const {
    register,
    reset,
    getValues,
    formState: { isValid },
  } = useForm<commentProps>({
    mode: "onChange",
    defaultValues: {
      id: "",
      password: "",
      comment: "",
    },
  });
  const onSubmit = async () => {
    if (!id) {
      toast.error("댓글 내용이 없습니다! 다시 확인해주세요!");
      return;
    }
    setIsModalOpen(false);
    setGlobalLoading(true);

    const data = getValues();
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
      toast.success("댓글이 작성됐습니다.");
      reset({
        id: "",
        password: "",
        comment: "",
      });
    } else {
      toast.error("댓글 작성에 실패했습니다.");
    }
    setIsModalOpen(false);
    setGlobalLoading(false);
  };

  const handleCommentConfirm = () => {
    if (!id) {
      toast.error("댓글 내용이 없습니다! 다시 확인해주세요!");
      return;
    }

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex gap-2">
        <input
          {...register("id", { required: "아이디를 입력해주세요" })}
          type="text"
          placeholder="아이디"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="new-password"
          data-lpignore="true"
        />
        <input
          {...register("password", { required: "패스워드를 입력해주세요" })}
          type="password"
          placeholder="비밀번호"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="new-password"
          data-lpignore="true"
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
          onClick={handleCommentConfirm}
        />
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={onSubmit}
        title="댓글 작성"
        message="댓글을 작성 하시겠습니까?"
        isCancel={false}
      />
    </div>
  );
};

export default CommentsWrite;
