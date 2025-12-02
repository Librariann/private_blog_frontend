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
import { Category, CategoryCount, GetCategoriesQuery } from "@/gql/graphql";
import { useCreateCategory } from "@/hooks/hooks";
import { SelectedCategoryType } from "@/pages/settings/management-categories";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { DynamicIcon } from "lucide-react/dynamic";
import { useState } from "react";
import { toast } from "react-toastify";

type CreateCategoryModalProps = {
  isAddModalOpen: boolean;
  handleAddCategoryOpen: (open: boolean) => void;
  categories: SelectedCategoryType;
};

type newCategoryTypes = {
  categoryTitle: string;
  type: "parent" | "child";
  parentCategoryId: string;
  icon: string;
  color: string;
  description: string;
};

const newCategoryBaseData: newCategoryTypes = {
  categoryTitle: "",
  type: "parent", // 'parent' or 'child'
  parentCategoryId: "",
  icon: "code",
  color: "from-blue-500 to-blue-600",
  description: "",
};

const CreateCategoryModal = ({
  isAddModalOpen,
  handleAddCategoryOpen,
  categories,
}: CreateCategoryModalProps) => {
  const [newCategory, setNewCategory] =
    useState<newCategoryTypes>(newCategoryBaseData);

  const { createCategoryMutation } = useCreateCategory();
  const { isDarkMode } = useDarkModeStore();
  const { setGlobalLoading } = useLoadingStore();

  const handleNewCategory = (name: string, value: string) => {
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleAddCategory = async () => {
    try {
      setGlobalLoading(true);
      const input = {
        categoryTitle: newCategory.categoryTitle,
        icon: newCategory.icon,
        iconColor: newCategory.color,
        description: newCategory.description,
        ...(newCategory.parentCategoryId && {
          parentCategoryId: +newCategory.parentCategoryId,
        }),
      };

      const result = await createCategoryMutation({
        variables: {
          input: input,
        },
      });
      if (result.data?.createCategory.ok) {
        toast.success("카테고리가 성공적으로 생성되었습니다.");
      } else {
        toast.error(result.data?.createCategory.error);
      }
      handleAddCategoryOpen(false);
      setNewCategory(newCategoryBaseData);
    } catch (e) {
      console.log(e);
      toast.error("카테고리 생성 실패!");
    } finally {
      setGlobalLoading(false);
    }
  };

  return (
    <Dialog
      open={isAddModalOpen}
      onOpenChange={() => handleAddCategoryOpen(false)}
    >
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className={`max-w-md max-h-[90vh] overflow-y-auto ${
          isDarkMode
            ? "bg-white/10 backdrop-blur-xs border-white/20"
            : "backdrop-blur-xs border-gray-200"
        }`}
      >
        <DialogHeader>
          <DialogTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
            카테고리 추가
          </DialogTitle>
          <DialogDescription
            className={isDarkMode ? "text-white/60" : "text-gray-600"}
          >
            새로운 카테고리를 추가합니다
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className={isDarkMode ? "text-white" : "text-gray-900"}>
              카테고리 유형
            </Label>
            <Select
              value={newCategory.type}
              onValueChange={(value) => handleNewCategory("type", value)}
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
                <SelectItem value="parent">상위 카테고리</SelectItem>
                <SelectItem value="child">하위 카테고리</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {newCategory.type === "child" && (
            <div className="space-y-2">
              <Label className={isDarkMode ? "text-white" : "text-gray-900"}>
                상위 카테고리
              </Label>
              <Select
                value={newCategory.parentCategoryId}
                onValueChange={(value) =>
                  handleNewCategory("parentCategoryId", value)
                }
              >
                <SelectTrigger
                  className={
                    isDarkMode
                      ? "bg-white/5 border-white/20 text-white"
                      : "bg-white border-gray-200"
                  }
                >
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem
                      key={category.categoryTitle}
                      value={category.id.toString()}
                    >
                      {category.categoryTitle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label className={isDarkMode ? "text-white" : "text-gray-900"}>
              카테고리 이름
            </Label>
            <Input
              value={newCategory.categoryTitle}
              onChange={(e) =>
                handleNewCategory("categoryTitle", e.target.value)
              }
              placeholder="예: Machine Learning"
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          <div className="space-y-2">
            <Label className={isDarkMode ? "text-white" : "text-gray-900"}>
              카테고리 설명
            </Label>
            <Input
              value={newCategory.description}
              onChange={(e) => handleNewCategory("description", e.target.value)}
              placeholder="카테고리에 대한 설명을 입력해주세요"
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          {newCategory.type === "parent" && (
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
                  {newCategory.icon &&
                    (() => {
                      const IconComponent: any = newCategory.icon || "code";

                      return (
                        IconComponent && (
                          <div className="mb-4 flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${newCategory.color} flex items-center justify-center`}
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
                                {newCategory.icon}
                              </p>
                            </div>
                          </div>
                        )
                      );
                    })()}
                  <IconPicker
                    selectedIcon={newCategory.icon}
                    onSelect={(icon) => handleNewCategory("icon", icon)}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className={isDarkMode ? "text-white" : "text-gray-900"}>
                  그라디언트 색상
                </Label>
                <ColorPicker
                  selectedColor={newCategory.color}
                  onSelect={(color) => handleNewCategory("color", color)}
                  isDarkMode={isDarkMode}
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <NewButton
              onClick={handleAddCategory}
              className={`flex-1 cursor-pointer ${
                isDarkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              추가
            </NewButton>
            <NewButton
              type="button"
              variant="default"
              onClick={() => handleAddCategoryOpen(false)}
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

export default CreateCategoryModal;
