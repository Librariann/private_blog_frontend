import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useState } from "react";
import { Send } from "lucide-react";
import { ReadMoreButton } from "../buttons/read-more-button";
import ConfirmModal from "../modal/confirm-modal";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { createComment } from "@/lib/comments";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Comment } from "@/gql/graphql";

const CommentsWriteForm = ({
  comments,
  handleAddComments,
  displayedCommentsCount,
}: any) => {
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentPassword, setCommentPassword] = useState("");
  const { isDarkMode } = useDarkModeStore();
  const { setGlobalLoading } = useLoadingStore();
  const { createCommentMutation } = createComment({ id: 1 });

  const router = useRouter();
  const { slug } = router.query;
  const postId =
    slug && Array.isArray(slug) && slug.length > 0
      ? slug[slug.length - 1].split("-")[1]
      : null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const onSubmit = async () => {
    if (!postId) {
      toast.error("댓글 내용이 없습니다! 다시 확인해주세요!");
      return;
    }
    setIsModalOpen(false);
    setGlobalLoading(true);

    // const data = getValues();
    const commentResult = await createCommentMutation({
      variables: {
        input: {
          commentId: commentAuthor,
          commentPassword: commentPassword,
          comment: newComment,
          postId: +postId,
        },
      },
    });

    if (commentResult.data?.createComment.ok) {
      toast.success("댓글이 작성됐습니다.");
      if (newComment.trim() && commentAuthor.trim()) {
        const comment: Comment = {
          id: comments.length + 1,
          commentId: commentAuthor,
          commentPassword: commentPassword,
          comment: newComment,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        handleAddComments(comment);
        setNewComment("");
        setCommentAuthor("");
        setCommentPassword("");
        // 새 댓글 작성 시 표시 개수를 늘려서 새 댓글이 보이도록
        if (displayedCommentsCount < comments.length + 1) {
          // setDisplayedCommentsCount(displayedCommentsCount + 1);
        }
      }
      //   reset({
      //     id: "",
      //     password: "",
      //     comment: "",
      //   });
    } else {
      toast.error("댓글 작성에 실패했습니다.");
    }
    setIsModalOpen(false);
    setGlobalLoading(false);
  };

  return (
    <>
      <div
        className={`p-6 rounded-xl mb-6 ${
          isDarkMode
            ? "bg-white/5 border border-white/10"
            : "bg-gray-50 border border-gray-200"
        }`}
      >
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            placeholder="이름"
            value={commentAuthor}
            onChange={(e) => setCommentAuthor(e.target.value)}
            className={`w-1/2 p-2 rounded-lg outline-none transition-all ${
              isDarkMode
                ? "bg-white/5 text-white placeholder-white/40 border border-white/10 focus:border-blue-400/50"
                : "bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-blue-400"
            }`}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={commentPassword}
            onChange={(e) => setCommentPassword(e.target.value)}
            className={`w-1/2 p-2 rounded-lg outline-none transition-all ${
              isDarkMode
                ? "bg-white/5 text-white placeholder-white/40 border border-white/10 focus:border-blue-400/50"
                : "bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-blue-400"
            }`}
          />
        </div>
        <textarea
          placeholder="댓글을 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 rounded-lg outline-none resize-none transition-all ${
            isDarkMode
              ? "bg-white/5 text-white placeholder-white/40 border border-white/10 focus:border-blue-400/50"
              : "bg-white text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-blue-400"
          }`}
        />
        <div
          className="flex justify-end mt-3"
          onClick={() => setIsModalOpen(true)}
        >
          <ReadMoreButton
            type="submit"
            className={
              isDarkMode
                ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }
          >
            <Send className="w-4 h-4 mr-2" />
            댓글 작성
          </ReadMoreButton>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => onSubmit()}
        title="댓글 작성"
        message="댓글을 작성 하시겠습니까?"
        isCancel={false}
      />
    </>
  );
};

export default CommentsWriteForm;
