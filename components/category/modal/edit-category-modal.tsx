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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditCategory, useGetCategories } from "@/hooks/hooks";
import { SelectedCategoryType } from "@/pages/settings/management-categories";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type EditCategoryType = {
  id: number;
  categoryTitle?: string;
  parentCategoryId?: number;
  icon?: string;
  iconColor?: string;
  description?: string;
};

type EditCategoryModalProps = {
  isEditModalOpen: boolean;
  handleEditModalOpen: (open: boolean) => void;
  selectedCategory: SelectedCategoryType[0];
};

const EditCategoryModal = ({
  isEditModalOpen,
  handleEditModalOpen,
  selectedCategory,
}: EditCategoryModalProps) => {
  const { isDarkMode } = useDarkModeStore();
  const { editCategoryMutation } = useEditCategory();
  const { setGlobalLoading } = useLoadingStore();
  const [editCategory, setEditCategory] = useState<EditCategoryType>({
    id: 0,
    categoryTitle: "",
    parentCategoryId: 0,
    icon: "",
    iconColor: "",
    description: "",
  });

  const { categories } = useGetCategories();

  useEffect(() => {
    setEditCategory({
      id: selectedCategory.id,
      categoryTitle: selectedCategory.categoryTitle,
      parentCategoryId: selectedCategory.parentCategory?.id,
      icon: selectedCategory?.icon || "",
      iconColor: selectedCategory?.iconColor || "",
      description: selectedCategory?.description || "",
    });
  }, [selectedCategory]);

  const handleEditCategory = async () => {
    try {
      setGlobalLoading(true);
      const input = {
        id: editCategory?.id!,
        ...(editCategory?.categoryTitle !== selectedCategory.categoryTitle && {
          categoryTitle: editCategory?.categoryTitle,
        }),
        ...(editCategory?.icon !== selectedCategory.icon && {
          icon: editCategory?.icon,
        }),
        ...(editCategory?.iconColor !== selectedCategory.iconColor && {
          iconColor: editCategory?.iconColor,
        }),
        ...(editCategory?.parentCategoryId !==
          selectedCategory.parentCategory?.id && {
          parentCategoryId: editCategory?.parentCategoryId,
        }),
        ...(editCategory?.description !== selectedCategory.description && {
          description: editCategory?.description,
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
    } catch {
      toast.error("카테고리 수정 실패!");
    } finally {
      setGlobalLoading(false);
      handleEditModalOpen(false);
    }
  };

  const handleEditCategoryChange = (key: string, value: string | number) => {
    setEditCategory({
      ...editCategory,
      [key]: value,
    });
  };

  return (
    <Dialog
      open={isEditModalOpen}
      onOpenChange={() => handleEditModalOpen(false)}
    >
      <DialogContent
        className={`max-w-md max-w-md max-h-[90vh] overflow-y-auto ${
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
          <div className="space-y-2">
            <Label className={isDarkMode ? "text-white" : "text-gray-900"}>
              카테고리 유형
            </Label>
            <Select
              value={editCategory?.parentCategoryId?.toString()}
              onValueChange={(value) => {
                handleEditCategoryChange("parentCategoryId", +value);
              }}
            >
              <SelectTrigger
                className={
                  isDarkMode
                    ? "bg-white/5 border-white/20 text-white"
                    : "bg-white border-gray-200"
                }
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.categoryTitle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className={isDarkMode ? "text-white" : "text-gray-900"}>
              카테고리 설명
            </Label>
            <Input
              value={editCategory.description}
              onChange={(e) =>
                handleEditCategoryChange("description", e.target.value)
              }
              placeholder="카테고리에 대한 설명을 입력해주세요"
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

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
                    const IconComponent: string = editCategory.icon || "code";
                    return (
                      IconComponent && (
                        <div className="mb-4 flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${editCategory.iconColor} flex items-center justify-center`}
                          >
                            <DynamicIcon
                              name={IconComponent as IconName}
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
