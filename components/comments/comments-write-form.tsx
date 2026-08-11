import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { ReadMoreButton } from "../buttons/read-more-button";
import ConfirmModal from "../modal/confirm-modal";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { toast } from "react-toastify";
import { useCreateComment } from "@/hooks/hooks";

type CommentsWriteFormProps = {
  postId: number;
};

const CommentsWriteForm = ({ postId }: CommentsWriteFormProps) => {
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentPassword, setCommentPassword] = useState("");
  const [isReadonlyAuthor, setIsReadonlyAuthor] = useState(true);
  const [isReadonlyPassword, setIsReadonlyPassword] = useState(true);
  const [formKey, setFormKey] = useState(Date.now());
  const { setGlobalLoading } = useLoadingStore();
  const { createCommentMutation } = useCreateComment({ id: postId });

  useEffect(() => {
    setCommentAuthor("");
    setCommentPassword("");
    setNewComment("");

    setTimeout(() => {
      setCommentAuthor("");
      setCommentPassword("");
      setNewComment("");
      setFormKey(Date.now());
    }, 100);
  }, []);

  const handleAuthorFocus = () => {
    if (isReadonlyAuthor) {
      setIsReadonlyAuthor(false);
      setCommentAuthor("");
    }
  };

  const handlePasswordFocus = () => {
    if (isReadonlyPassword) {
      setIsReadonlyPassword(false);
      setCommentPassword("");
    }
  };

  const onSubmit = async () => {
    if (!commentAuthor.trim()) {
      toast.error("아이디를 입력해주세요.");
      return;
    }
    if (!commentPassword.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }
    if (!newComment.trim()) {
      toast.error("댓글 내용을 입력해주세요.");
      return;
    }
    setIsModalOpen(false);
    setGlobalLoading(true);

    // const data = getValues();
    const commentResult = await createCommentMutation({
      variables: {
        input: {
          annonymousId: commentAuthor,
          annonymousPassword: commentPassword,
          comment: newComment,
          postId: +postId,
        },
      },
    });

    if (commentResult.data?.createComment.ok) {
      toast.success("댓글이 작성됐습니다.");
      if (newComment.trim() && commentAuthor.trim()) {
        setNewComment("");
        setCommentAuthor("");
        setCommentPassword("");
      }
    } else {
      toast.error("댓글 작성에 실패했습니다.");
    }
    setIsModalOpen(false);
    setGlobalLoading(false);
  };

  return (
    <>
      <div className="editorial-comment-form">
        <form
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
          key={formKey}
        >
          <input type="text" name="username" style={{ display: "none" }} />
          <input type="password" name="password" style={{ display: "none" }} />

          <div className="flex gap-3 mb-3">
            <input
              key={`author-${formKey}`}
              type="text"
              name="comment-author-field"
              placeholder="이름"
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              onFocus={handleAuthorFocus}
              readOnly={isReadonlyAuthor}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              data-form-type="other"
              className="editorial-field"
            />
            <input
              key={`password-${formKey}`}
              type="password"
              name="comment-password-field"
              placeholder="비밀번호"
              value={commentPassword}
              onChange={(e) => setCommentPassword(e.target.value)}
              onFocus={handlePasswordFocus}
              readOnly={isReadonlyPassword}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              data-form-type="other"
              className="editorial-field"
            />
          </div>
          <textarea
            placeholder="댓글을 입력하세요..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="editorial-field editorial-textarea"
          />
          <div className="flex justify-end mt-3">
            <ReadMoreButton
              type="submit"
              onClick={() => setIsModalOpen(true)}
              className="editorial-signal-button"
            >
              <Send className="w-4 h-4 mr-2" />
              댓글 작성
            </ReadMoreButton>
          </div>
        </form>
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
