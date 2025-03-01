import { NewButton } from "@/components/buttons/new-button";
import ColorPicker from "@/components/ui/color-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IconPicker from "@/components/ui/icon-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryCount } from "@/gql/graphql";
import { useEditCategory } from "@/hooks/hooks";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { DynamicIcon } from "lucide-react/dynamic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type EditCategoryModalProps = {
  isEditModalOpen: boolean;
  handleEditModalOpen: (open: boolean) => void;
  isParent: boolean;
  selectedCategory: CategoryCount;
};

const EditCategoryModal = ({
  isEditModalOpen,
  handleEditModalOpen,
  isParent,
  selectedCategory,
}: EditCategoryModalProps) => {
  const { isDarkMode } = useDarkModeStore();
  const { editCategoryMutation } = useEditCategory();

  const [editCategory, setEditCategory] = useState<CategoryCount>({
    id: 0,
    categoryTitle: "",
    icon: "",
    iconColor: "",
  });

  useEffect(() => {
    setEditCategory({
      ...selectedCategory,
    });
  }, [selectedCategory]);

  const handleEditCategory = async () => {
    const input = {
      id: editCategory.id,
      categoryTitle: editCategory.categoryTitle,
      icon: editCategory.icon,
      iconColor: editCategory.iconColor,
      ...(editCategory.parentCategoryId && {
        parentCategoryId: +editCategory.parentCategoryId,
      }),
    };

    const result = await editCategoryMutation({
      variables: {
        input: input,
      },
    });
    if (result.data?.editCategory.ok) {
      toast.success("카테고리가 성공적으로 수정되었습니다.");
    } else {
      toast.error(result.data?.editCategory.error);
    }
    handleEditModalOpen(false);
  };

  return (
    <Dialog
      open={isEditModalOpen}
      onOpenChange={() => handleEditModalOpen(false)}
    >
      <DialogContent
        className={`max-w-md ${
          isDarkMode
            ? "bg-white/10 backdrop-blur-xs border-white/20"
            : "backdrop-blur-xs border-gray-200"
        }`}
      >
        <DialogHeader>
          <DialogTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
            카테고리 수정
          </DialogTitle>
          <DialogDescription
            className={isDarkMode ? "text-white/60" : "text-gray-600"}
          >
            카테고리 정보를 수정합니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className={isDarkMode ? "text-white" : "text-gray-900"}>
              카테고리 이름
            </Label>
            <Input
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  categoryTitle: e.target.value,
                })
              }
              value={editCategory?.categoryTitle}
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {isParent && (
            <>
              <div className="space-y-2">
                <Label className={isDarkMode ? "text-white" : "text-gray-900"}>
                  아이콘 선택
                </Label>
                <div
                  className={`p-4 rounded-lg border ${
                    isDarkMode
                      ? "bg-white/5 border-white/20"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {/* Selected Icon Preview */}
                  {editCategory?.icon &&
                    (() => {
                      const IconComponent: any = editCategory.icon || "code";
                      return (
                        IconComponent && (
                          <div className="mb-4 flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${editCategory.iconColor} flex items-center justify-center`}
                            >
                              <DynamicIcon
                                name={IconComponent}
                                className="w-5 h-5"
                                color="white"
                              />
                            </div>
                            <div>
                              <p
                                className={`text-sm ${isDarkMode ? "text-white/80" : "text-gray-700"}`}
                              >
                                선택된 아이콘
                              </p>
                              <p
                                className={`text-xs ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
                              >
                                {editCategory?.icon}
                              </p>
                            </div>
                          </div>
                        )
                      );
                    })()}
                  <IconPicker
                    selectedIcon={editCategory?.icon || "code"}
                    onSelect={(icon) =>
                      setEditCategory({
                        ...editCategory,
                        icon: icon,
                      })
                    }
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className={isDarkMode ? "text-white" : "text-gray-900"}>
                  그라디언트 색상
                </Label>
                <ColorPicker
                  selectedColor={editCategory?.iconColor || ""}
                  onSelect={(color) =>
                    setEditCategory({
                      ...editCategory,
                      iconColor: color,
                    })
                  }
                  isDarkMode={isDarkMode}
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <NewButton
              onClick={handleEditCategory}
              className={`flex-1 cursor-pointer ${
                isDarkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              저장
            </NewButton>
            <NewButton
              type="button"
              variant="default"
              onClick={() => {
                handleEditModalOpen(false);
              }}
              className={`flex-1 cursor-pointer ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                  : "border-gray-300"
              }`}
            >
              취소
            </NewButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
