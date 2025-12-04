import { NewButton } from "@/components/buttons/new-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CommentType } from "../comments";
import { useDeleteComment, useEditComment } from "@/hooks/hooks";
import { useRouter } from "next/router";
import { Textarea } from "@/components/ui/text-area";

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
  const { isDarkMode } = useDarkModeStore();
  const [commentPassword, setCommentPassword] = useState<string>("");
  const [editComment, setEditComment] = useState<string>("");
  const { editCommentMutation } = useEditComment(postId, selectedComment?.id);
  useEffect(() => {
    setEditComment("");
    setCommentPassword("");
  }, [isEditDialogOpen]);

  const handleOnEditComment = async () => {
    console.log(editComment);
    if (!editComment.trim()) {
      toast.error("댓글 내용을 입력해주세요");
      return;
    }

    if (!commentPassword.trim()) {
      toast.error("댓글 비밀번호를 입력해주세요.");
      return;
    }
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
      toast.success(result.data?.editComment.message);
    } else {
      toast.error(result.data?.editComment.error);
    }
    setIsEditDialogOpen(false);
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent
        className={`max-w-md ${
          isDarkMode
            ? "bg-white/10 backdrop-blur-xs border-white/20"
            : "backdrop-blur-xs border-gray-200"
        }`}
      >
        <DialogHeader>
          <DialogTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
            댓글 수정
          </DialogTitle>
          <DialogDescription
            className={isDarkMode ? "text-white/60" : "text-gray-600"}
          >
            정말로 이 댓글을 수정하시겠습니까?
          </DialogDescription>
          <DialogDescription>
            <Textarea
              className="mb-2"
              placeholder="수정할 댓글 내용을 적어주세요"
              onChange={(e) => {
                setEditComment(e.target.value);
              }}
            />
            <Input
              type="password"
              placeholder="해당 댓글의 비밀번호를 입력해주세요"
              onChange={(e) => {
                setCommentPassword(e.target.value);
              }}
            />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <NewButton
            variant="destructive"
            className={`flex-1 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer`}
            onClick={handleOnEditComment}
          >
            수정
          </NewButton>
          <DialogClose asChild>
            <NewButton
              variant="outline"
              className={`flex-1 cursor-pointer ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  : "border-gray-300"
              }`}
            >
              취소
            </NewButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditConfirmModal;
