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
import { useDeleteComment } from "@/hooks/hooks";
import { useRouter } from "next/router";

const UserDeleteConfirmModal = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedComment,
  postId,
}: {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  selectedComment: CommentType;
  postId: number;
}) => {
  const { isDarkMode } = useDarkModeStore();
  const [commentPassword, setCommentPassword] = useState<string>("");
  const { asPath } = useRouter();
  const { deleteCommentMutation } = useDeleteComment(
    postId,
    selectedComment?.id
  );
  useEffect(() => {
    setCommentPassword("");
  }, [isDeleteDialogOpen]);

  const handleOnDeleteComment = async () => {
    if (!commentPassword) {
      toast.error("댓글 비밀번호를 입력해주세요.");
      return;
    }
    const result = await deleteCommentMutation({
      variables: {
        input: {
          id: selectedComment.id,
          commentPassword,
        },
      },
    });

    if (result.data?.deleteComment.ok) {
      toast.success("댓글이 삭제됐습니다.");
      // ✅ 스크롤 위치 유지하면서 새로고침
    } else {
      toast.error(result.data?.deleteComment.error);
    }

    setIsDeleteDialogOpen(false);
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent
        className={`max-w-md ${
          isDarkMode
            ? "bg-white/10 backdrop-blur-xs border-white/20"
            : "backdrop-blur-xs border-gray-200"
        }`}
      >
        <DialogHeader>
          <DialogTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
            댓글 삭제
          </DialogTitle>
          <DialogDescription
            className={isDarkMode ? "text-white/60" : "text-gray-600"}
          >
            정말로 이 댓글을 삭제하시겠습니까?
            <span className="block mt-2 text-red-400">
              ⚠️ 이 작업은 되돌릴 수 없습니다.
            </span>
          </DialogDescription>
          <DialogDescription>
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
            className={`flex-1 bg-red-500 hover:bg-red-600 text-white cursor-pointer`}
            onClick={handleOnDeleteComment}
          >
            삭제
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

export default UserDeleteConfirmModal;
