import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { useEditComment } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CommentType } from "../comments";

const UserEditConfirmModal = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedComment,
  postId,
}: {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedComment: CommentType;
  postId: number;
}) => {
  const [commentPassword, setCommentPassword] = useState("");
  const [editComment, setEditComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { editCommentMutation } = useEditComment(postId, selectedComment?.id);

  useEffect(() => {
    if (isEditDialogOpen) {
      setEditComment(selectedComment?.comment ?? "");
      setCommentPassword("");
    }
  }, [isEditDialogOpen, selectedComment?.comment]);

  const handleOnEditComment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!editComment.trim()) {
      toast.error("댓글 내용을 입력해주세요");
      return;
    }

    if (!commentPassword.trim()) {
      toast.error("댓글 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await editCommentMutation({
        variables: {
          input: {
            id: selectedComment.id,
            commentPassword,
            comment: editComment,
          },
        },
      });

      if (result.data?.editComment.ok) {
        toast.success(result.data.editComment.message);
        setIsEditDialogOpen(false);
      } else {
        toast.error(result.data?.editComment.error);
      }
    } catch {
      toast.error("댓글을 수정하지 못했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="editorial-comment-edit-modal">
        <DialogHeader className="editorial-comment-edit-header">
          <div className="editorial-comment-edit-meta" aria-hidden="true">
            <span>Edit / 01</span>
            <span>Comment desk</span>
          </div>
          <DialogTitle>댓글 수정</DialogTitle>
          <DialogDescription>
            내용을 다듬은 뒤, 작성할 때 설정한 비밀번호로 변경사항을
            확인해주세요.
          </DialogDescription>
        </DialogHeader>

        <form
          className="editorial-comment-edit-form"
          onSubmit={handleOnEditComment}
        >
          <label htmlFor="edit-comment-content">
            <span className="editorial-comment-edit-label">
              <span>01 / Comment</span>
              <span>{editComment.length}자</span>
            </span>
            <Textarea
              id="edit-comment-content"
              value={editComment}
              rows={6}
              autoFocus
              placeholder="수정할 댓글 내용을 적어주세요"
              onChange={(event) => setEditComment(event.target.value)}
            />
          </label>

          <label htmlFor="edit-comment-password">
            <span className="editorial-comment-edit-label">
              <span>02 / Password</span>
              <span>확인용</span>
            </span>
            <Input
              id="edit-comment-password"
              value={commentPassword}
              type="password"
              autoComplete="current-password"
              placeholder="댓글 비밀번호를 입력해주세요"
              onChange={(event) => setCommentPassword(event.target.value)}
            />
          </label>

          <div className="editorial-comment-edit-actions">
            <DialogClose asChild>
              <button type="button" className="editorial-comment-edit-cancel">
                취소
                <span aria-hidden="true">ESC</span>
              </button>
            </DialogClose>
            <button
              type="submit"
              className="editorial-comment-edit-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "저장 중" : "변경사항 저장"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditConfirmModal;
