import { NewButton } from "@/components/buttons/new-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category, CategoryCount } from "@/gql/graphql";
import { SelectedCategoryType } from "@/pages/settings/management-categories";
import { useDarkModeStore } from "@/stores/useDarkmodStore";

type DeleteCategoryModalProps = {
  isDeleteDialogOpen: boolean;
  handleDeleteDialogOpen: (open: boolean) => void;
  isParent: boolean;
  selectedCategory: SelectedCategoryType[0];
};

const DeleteCategoryModal = ({
  isDeleteDialogOpen,
  handleDeleteDialogOpen,
  isParent,
  selectedCategory,
}: DeleteCategoryModalProps) => {
  const { isDarkMode } = useDarkModeStore();

  const handleDeleteCategory = () => {
    console.log("Deleting category:", selectedCategory);
    handleDeleteDialogOpen(false);
  };

  return (
    <Dialog
      open={isDeleteDialogOpen}
      onOpenChange={() => handleDeleteDialogOpen(false)}
    >
      <DialogContent
        className={`max-w-md ${
          isDarkMode
            ? "glass-card border-white/20"
            : "glass-card-light border-gray-200"
        }`}
      >
        <DialogHeader>
          <DialogTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
            카테고리 삭제
          </DialogTitle>
          <DialogDescription
            className={isDarkMode ? "text-white/60" : "text-gray-600"}
          >
            정말로 {selectedCategory?.categoryTitle} 카테고리를
            삭제하시겠습니까?
            {isParent && (
              <span className="block mt-2 text-red-400">
                ⚠️ 상위 카테고리를 삭제하면 하위 카테고리도 함께 삭제됩니다.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 pt-4">
          <NewButton
            onClick={handleDeleteCategory}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            삭제
          </NewButton>
          <NewButton
            variant="outline"
            onClick={() => handleDeleteDialogOpen(false)}
            className={`flex-1 ${
              isDarkMode
                ? "border-white/20 text-white hover:bg-white/10"
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

export default DeleteCategoryModal;
