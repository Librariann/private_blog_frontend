import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import IconPicker from "../../ui/icon-picker";
import ColorPicker from "../../ui/color-picker";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { NewButton } from "../../buttons/new-button";
import { Plus, X } from "lucide-react";
import { Badge } from "../../ui/badge";
import * as LucideIcons from "lucide-react";

type CreateCategoryModalProps = {
  isAddCategoryOpen: boolean;
  handleAddCategoryOpen: (open: boolean) => void;
};

const CreateCategoryModal = ({
  isAddCategoryOpen,
  handleAddCategoryOpen,
}: CreateCategoryModalProps) => {
  const [newCategoryIcon, setNewCategoryIcon] = useState("Code2");
  const [newCategoryColor, setNewCategoryColor] = useState(
    "from-blue-500 to-cyan-500"
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubCategoryInput, setNewSubCategoryInput] = useState("");
  const [newSubCategories, setNewSubCategories] = useState<string[]>([]);
  const { isDarkMode } = useDarkModeStore();

  const handleAddSubCategory = () => {
    if (
      newSubCategoryInput.trim() &&
      !newSubCategories.includes(newSubCategoryInput.trim())
    ) {
      setNewSubCategories([...newSubCategories, newSubCategoryInput.trim()]);
      setNewSubCategoryInput("");
    }
  };

  const handleRemoveSubCategory = (subCat: string) => {
    setNewSubCategories(newSubCategories.filter((s) => s !== subCat));
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim() || newSubCategories.length === 0) {
      alert("카테고리 이름과 최소 1개의 하위 카테고리를 입력해주세요.");
      return;
    }

    handleAddCategoryOpen(false);
    setNewCategoryName("");
    setNewCategoryIcon("Code2");
    setNewCategoryColor("from-blue-500 to-cyan-500");
    setNewSubCategories([]);
    setNewSubCategoryInput("");
  };

  return (
    <Dialog
      open={isAddCategoryOpen}
      onOpenChange={() => handleAddCategoryOpen(false)}
    >
      <DialogContent
        className={`max-w-2xl max-h-[90vh] overflow-y-auto ${
          isDarkMode
            ? "bg-white/10 backdrop-blur-xs border-white/20"
            : "backdrop-blur-xs border-gray-200"
        }`}
      >
        <DialogHeader>
          <DialogTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
            새 카테고리 만들기
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <Label
              className={`mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              카테고리 이름 *
            </Label>
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="예: 디자인, AI, 클라우드"
              className={
                isDarkMode
                  ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                  : "bg-white border-gray-200"
              }
            />
          </div>

          <div>
            <Label
              className={`mb-3 block ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              아이콘 선택 *
            </Label>
            <div
              className={`p-4 rounded-lg border ${
                isDarkMode
                  ? "bg-white/5 border-white/20"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              {newCategoryIcon &&
                (() => {
                  const IconComponent = (LucideIcons as any)[newCategoryIcon];
                  return (
                    IconComponent && (
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${newCategoryColor} flex items-center justify-center`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
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
                            {newCategoryIcon}
                          </p>
                        </div>
                      </div>
                    )
                  );
                })()}
              <IconPicker
                selectedIcon={newCategoryIcon}
                onSelect={setNewCategoryIcon}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>

          <div>
            <Label
              className={`mb-3 block ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              그라디언트 색상 *
            </Label>
            <ColorPicker
              selectedColor={newCategoryColor}
              onSelect={setNewCategoryColor}
              isDarkMode={isDarkMode}
            />
          </div>

          <div>
            <Label
              className={`mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              하위 카테고리 *
            </Label>
            <div className="flex gap-2 mb-3">
              <Input
                value={newSubCategoryInput}
                onChange={(e) => setNewSubCategoryInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSubCategory();
                  }
                }}
                placeholder="하위 카테고리 입력 후 Enter"
                className={
                  isDarkMode
                    ? "bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    : "bg-white border-gray-200"
                }
              />
            </div>

            {newSubCategories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {newSubCategories.map((subCat) => (
                  <Badge
                    key={subCat}
                    variant="secondary"
                    className={`${
                      isDarkMode
                        ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                        : "bg-purple-100 text-purple-700 border-purple-200"
                    } pl-3 pr-1 py-1`}
                  >
                    {subCat}
                    <button
                      onClick={() => handleRemoveSubCategory(subCat)}
                      className="ml-2 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <p
              className={`text-sm mt-2 ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
            >
              {newSubCategories.length}개의 하위 카테고리 (최소 1개 필요)
            </p>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <NewButton
              variant="outline"
              onClick={() => handleAddCategoryOpen(false)}
              className={
                isDarkMode ? "border-white/20 text-white hover:bg-white/10" : ""
              }
            >
              취소
            </NewButton>
            <NewButton
              onClick={handleCreateCategory}
              disabled={
                !newCategoryName.trim() || newSubCategories.length === 0
              }
              className={
                isDarkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                  : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              }
            >
              카테고리 생성
            </NewButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
