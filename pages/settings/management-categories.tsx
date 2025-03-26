import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useCreateCategory, useGetCategoryCounts } from "@/hooks/hooks";
import { useRouter } from "next/router";
import { NewButton } from "@/components/buttons/new-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GlassCardMain } from "@/components/main/main";
import CreateCategoryModal from "@/components/category/modal/create-category-modal";
import { DynamicIcon } from "lucide-react/dynamic";
import EditCategoryModal from "@/components/category/modal/edit-category-modal";
import { CategoryCount } from "@/gql/graphql";

const ManagementCategories = () => {
  const { isDarkMode } = useDarkModeStore();
  const { countsData } = useGetCategoryCounts();
  const { back } = useRouter();

  const firstCategory = countsData?.[0]?.categoryTitle || "";
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>();
  const [selectedCategory, setSelectedCategory] = useState<CategoryCount>();
  const [isParent, setIsParent] = useState<boolean>(false);
  const handleAddCategoryOpen = (open: boolean) => {
    setIsAddModalOpen(open);
  };

  const handleEditModalOpen = (open: boolean) => {
    setIsEditModalOpen(open);
  };

  useEffect(() => {
    setExpandedCategories(new Set([firstCategory]));
  }, [countsData, firstCategory]);

  const toggleCategoryExpand = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const handleDeleteCategory = () => {
    // TODO: 실제 카테고리 삭제 로직
    console.log("Deleting category:", selectedCategory);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => back}
          className={`flex items-center space-x-2 mb-4 transition-colors ${
            isDarkMode
              ? "text-white/70 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>뒤로가기</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1
              className={`mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              카테고리 관리
            </h1>
            <p className={isDarkMode ? "text-white/60" : "text-gray-600"}>
              블로그의 카테고리를 추가, 수정, 삭제할 수 있습니다
            </p>
          </div>
          <NewButton
            onClick={() => setIsAddModalOpen(true)}
            className={
              isDarkMode
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            카테고리 추가
          </NewButton>
        </div>
      </div>

      {/* Category List */}
      <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6">
        <div className="space-y-2">
          {countsData?.map((parentCategory) => {
            const isExpanded = expandedCategories?.has(
              parentCategory.categoryTitle
            );

            return (
              <div key={parentCategory.categoryTitle}>
                {/* Parent Category */}
                <div
                  className={`flex items-center justify-between px-4 py-3 rounded-lg ${
                    isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={() =>
                        toggleCategoryExpand(parentCategory.categoryTitle)
                      }
                      className="p-1  cursor-pointer"
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 0 : -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown
                          className={`w-5 h-5 ${isDarkMode ? "text-white/70" : "text-gray-600"}`}
                        />
                      </motion.div>
                    </button>

                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${parentCategory.iconColor} flex items-center justify-center`}
                    >
                      <DynamicIcon
                        className="w-4 h-4"
                        color="white"
                        name={(parentCategory.icon as any) || "code"}
                      />
                    </div>

                    <div className="flex-1">
                      <div
                        onClick={() =>
                          toggleCategoryExpand(parentCategory.categoryTitle)
                        }
                        className={`flex items-center gap-3 cursor-pointer ${isDarkMode ? "text-white" : "text-gray-900"}`}
                      >
                        <span>{parentCategory.categoryTitle}</span>
                        <span
                          className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
                        >
                          (
                          {parentCategory?.children?.reduce(
                            (sum: number, sub: any) => sum + sub.count,
                            0
                          )}
                          개 포스트)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <NewButton
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleEditModalOpen(true);
                        setSelectedCategory(parentCategory);
                        setIsParent(true);
                      }}
                      className={
                        isDarkMode
                          ? "text-white/70 hover:text-white hover:bg-white/10"
                          : ""
                      }
                    >
                      <Edit className="w-4 h-4" />
                    </NewButton>
                    <NewButton
                      variant="ghost"
                      size="sm"
                      className={
                        isDarkMode
                          ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          : "text-red-600"
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </NewButton>
                  </div>
                </div>

                {/* Sub Categories */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-16 mt-1 space-y-1">
                        {parentCategory.children?.map((subCategory) => (
                          <div
                            key={subCategory.categoryTitle}
                            className={`flex items-center justify-between px-4 py-2 rounded-lg ${
                              isDarkMode
                                ? "hover:bg-white/5"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <ChevronRight
                                className={`w-4 h-4 ${isDarkMode ? "text-white/50" : "text-gray-400"}`}
                              />
                              <span
                                className={
                                  isDarkMode ? "text-white/80" : "text-gray-700"
                                }
                              >
                                {subCategory.categoryTitle}
                              </span>
                              <span
                                className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
                              >
                                ({subCategory.count}개 포스트)
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <NewButton
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  handleEditModalOpen(true);
                                  setSelectedCategory(subCategory);
                                  setIsParent(false);
                                }}
                                className={
                                  isDarkMode
                                    ? "text-white/70 hover:text-white hover:bg-white/10"
                                    : ""
                                }
                              >
                                <Edit className="w-4 h-4" />
                              </NewButton>
                              <NewButton
                                variant="ghost"
                                size="sm"
                                className={
                                  isDarkMode
                                    ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                    : "text-red-600"
                                }
                              >
                                <Trash2 className="w-4 h-4" />
                              </NewButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </GlassCardMain>

      {/* Add Category Modal */}
      <CreateCategoryModal
        isAddModalOpen={isAddModalOpen}
        handleAddCategoryOpen={handleAddCategoryOpen}
        countsData={countsData || []}
      />

      {/* Edit Category Modal */}
      {selectedCategory && (
        <EditCategoryModal
          isEditModalOpen={isEditModalOpen}
          handleEditModalOpen={handleEditModalOpen}
          isParent={isParent}
          selectedCategory={selectedCategory}
        />
      )}
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent
          className={`max-w-md ${
            isDarkMode
              ? "glass-card border-white/20"
              : "glass-card-light border-gray-200"
          }`}
        >
          <DialogHeader>
            <DialogTitle
              className={isDarkMode ? "text-white" : "text-gray-900"}
            >
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
              onClick={() => setIsDeleteDialogOpen(false)}
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
    </div>
  );
};

export default ManagementCategories;
