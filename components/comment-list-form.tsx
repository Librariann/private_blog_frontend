import { useState } from "react";
import { CommentProps } from "./comments";
import ConfirmModal from "./modal/confirm-modal";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { GET_POST_BY_ID_QUERY } from "@/pages/[contents]/[id]";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const CommentListForm = ({ comment }: { comment: CommentProps }) => {
  const router = useRouter();
  const { id } = router.query;

  const [commentEditMode, setCommentEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState(comment.comment);
  const [cmtDeleteConfirmModal, setCmtDeleteConfirmModal] = useState(false);
  const [cmtEditConfirmModal, setCmtEditConfirmModal] = useState(false);

  const EDIT_COMMENT_MUTATION = gql`
    mutation editComment($input: EditCommentInput!) {
      editComment(input: $input) {
        ok
        error
      }
    }
  `;

  const [editCommentMutation, loading] = useMutation(EDIT_COMMENT_MUTATION, {
    refetchQueries: [
      {
        query: GET_POST_BY_ID_QUERY,
        variables: { postId: Number(id) },
      },
    ],
    awaitRefetchQueries: true,
    // 캐시도 함께 업데이트
    update(cache, { data }) {
      if (data?.editComment.ok) {
        cache.evict({ fieldName: "getPostList" });
        cache.evict({ fieldName: "getPostListByCategoryId" });
        cache.gc();
      }
    },
  });

  const handleUpdateCommentStatus = () => {
    setCommentEditMode(!commentEditMode);
  };

  const cmtEditConfirmModalStatus = () => {
    setCmtEditConfirmModal(!cmtEditConfirmModal);
  };

  const handleUpdateComment = async (password?: string) => {
    const result = await editCommentMutation({
      variables: {
        input: {
          id: comment.id,
          comment: commentValue,
          commentPassword: password,
        },
      },
    });
    if (result.data?.editComment.ok) {
      cmtEditConfirmModalStatus();
      handleUpdateCommentStatus();
      toast.success("댓글 수정이 완료되었습니다.");
    } else {
      toast.error(result.data?.editComment.error);
    }
  };

  const handleDeleteComment = () => {
    console.log("삭제");
  };

  return (
    <div className="space-y-6 border-t">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div className="font-semibold">{comment.commentId}</div>
          <div className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        {commentEditMode ? (
          <input
            type="text"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            className="border border-gray-300 rounded w-full p-2"
          />
        ) : (
          <p className="text-gray-700">{comment.comment}</p>
        )}
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="text-sm text-blue-500 hover:text-blue-600"
            onClick={
              commentEditMode
                ? () => cmtEditConfirmModalStatus()
                : () => handleUpdateCommentStatus()
            }
          >
            {commentEditMode ? "수정완료" : "수정"}
          </button>
          <button
            className="text-sm text-red-500 hover:text-red-600"
            onClick={handleDeleteComment}
          >
            삭제
          </button>
        </div>
      </div>
      <ConfirmModal
        isOpen={cmtEditConfirmModal}
        onClose={() => {
          setCmtEditConfirmModal(false);
        }}
        onConfirm={(password) => {
          handleUpdateComment(password);
        }}
        title="댓글 수정"
        message="댓글을 수정하시겠습니까?"
        isCancel={false}
        isComment={true}
      />
      <ConfirmModal
        isOpen={cmtDeleteConfirmModal}
        onClose={() => {
          setCmtDeleteConfirmModal(false);
        }}
        onConfirm={() => {
          handleDeleteComment();
        }}
        title="댓글 삭제"
        message="댓글을 삭제하시겠습니까?"
        isCancel={false}
      />
    </div>
  );
};

export default CommentListForm;
