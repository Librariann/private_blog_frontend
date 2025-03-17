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
import { useDeleteCommentByAdmin } from "@/hooks/hooks";
import { CommentType } from "@/pages/settings/management-comments";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { toast } from "react-toastify";

const DeleteConfirmModal = ({
  selectedComment,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
}: {
  selectedComment: CommentType;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
}) => {
  const { isDarkMode } = useDarkModeStore();
  const { deleteCommentByAdminMutation } = useDeleteCommentByAdmin();

  const onDeleteCommentByAdmin = async () => {
    const result = await deleteCommentByAdminMutation({
      variables: { id: selectedComment.id },
    });
    if (result.data?.deleteCommentByAdmin.ok) {
      toast.success("댓글이 삭제되었습니다.");
    } else {
      toast.error(result.data?.deleteCommentByAdmin.error);
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
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <NewButton
              variant="destructive"
              className={`flex-1 bg-red-500 hover:bg-red-600 text-white cursor-pointer`}
              onClick={onDeleteCommentByAdmin}
            >
              삭제
            </NewButton>
          </DialogClose>
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

export default DeleteConfirmModal;
