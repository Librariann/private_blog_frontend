import { NewButton } from "@/components/buttons/new-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDarkModeStore } from "@/stores/useDarkmodStore";

const DeleteConfirmModal = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedPost,
  handleDeletePost,
}: {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  selectedPost: string;
  handleDeletePost: () => void;
}) => {
  const { isDarkMode } = useDarkModeStore();
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
            포스트 삭제
          </DialogTitle>
          <DialogDescription
            className={isDarkMode ? "text-white/60" : "text-gray-600"}
          >
            정말로 {selectedPost} 포스트를 삭제하시겠습니까?
            <span className="block mt-2 text-red-400">
              ⚠️ 이 작업은 되돌릴 수 없습니다.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 pt-4">
          <NewButton
            onClick={handleDeletePost}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          >
            삭제
          </NewButton>
          <NewButton
            variant="default"
            onClick={() => setIsDeleteDialogOpen(false)}
            className={`flex-1 cursor-pointer ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                : "border-gray-300"
            }`}
          >
            취소
          </NewButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmModal;
