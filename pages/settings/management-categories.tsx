import { ArrowLeft, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useEditSortCategoryMutation, useGetCategories } from "@/hooks/hooks";
import { useRouter } from "next/router";
import { NewButton } from "@/components/buttons/new-button";
import { GlassCardMain } from "@/components/main/main";
import CreateCategoryModal from "@/components/category/modal/create-category-modal";
import EditCategoryModal from "@/components/category/modal/edit-category-modal";
import {
  Category,
  CategorySortInput,
  EditSortCategoryInput,
  GetCategoriesQuery,
} from "@/gql/graphql";
import DeleteCategoryModal from "@/components/category/modal/delete-category-modal";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableParentCategory from "@/components/category/sortable-parent-category";
import SortableSubCategory from "@/components/category/sortable-sub-category";
import { toast } from "react-toastify";

export type SelectedCategoryType = NonNullable<
  GetCategoriesQuery["getCategories"]["categories"]
>;

type DragInfo = {
  type: "parent" | "sub";
  subCategories?: SelectedCategoryType | null;
} | null;

const ManagementCategories = () => {
  const { isDarkMode } = useDarkModeStore();
  const { categories } = useGetCategories();
  const { back } = useRouter();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>();
  const [isParent, setIsParent] = useState(false);
  const [localCategories, setLocalCategories] = useState<SelectedCategoryType>(
    []
  );
  const [lastDragInfo, setLastDragInfo] = useState<DragInfo>(null);
  const [dragApprove, setDragApprove] = useState(false);
  const { editSortCategory } = useEditSortCategoryMutation();

  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategoryType[0]>();

  const handleAddCategoryOpen = (open: boolean) => {
    setIsAddModalOpen(open);
  };

  const handleEditModalOpen = (open: boolean) => {
    setIsEditModalOpen(open);
  };

  const handleDeleteDialogOpen = (open: boolean) => {
    setIsDeleteDialogOpen(open);
  };

  useEffect(() => {
    if (!categories || categories.length === 0) return;
    setLocalCategories(categories);
    setExpandedCategories(new Set([categories?.[0]?.categoryTitle || ""]));
  }, [categories]);

  const toggleCategoryExpand = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px 이동해야 드래그 시작 (클릭과 구분)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Parent 카테고리인지 Sub 카테고리인지 판단
    setLocalCategories((prevCategories) => {
      if (!prevCategories) return prevCategories;

      // Parent 카테고리 드래그인 경우
      const oldParentIndex = prevCategories.findIndex(
        (value) => value.id.toString() === activeId
      );
      const newParentIndex = prevCategories.findIndex(
        (value) => value.id.toString() === overId
      );

      const targetParent = prevCategories.find((parent) =>
        parent.subCategories?.find((sub) => sub.id.toString() === activeId)
      );

      if (oldParentIndex !== -1 && newParentIndex !== -1) {
        return arrayMove(prevCategories, oldParentIndex, newParentIndex);
      }

      // Sub 카테고리 드래그인 경우
      const newCategories = prevCategories.map((parent) => {
        if (parent.id !== targetParent?.id) {
          return parent;
        }

        const oldSubIndex = parent.subCategories?.findIndex(
          (s) => s.id.toString() === activeId
        );
        const newSubIndex = parent.subCategories?.findIndex(
          (s) => s.id.toString() === overId
        );

        if (
          oldSubIndex !== undefined &&
          oldSubIndex !== -1 &&
          newSubIndex !== undefined &&
          newSubIndex !== -1 &&
          parent.subCategories
        ) {
          return {
            ...parent,
            subCategories: arrayMove(
              parent.subCategories,
              oldSubIndex,
              newSubIndex
            ),
          };
        }

        return parent;
      });

      const updatedParent = newCategories.find(
        (category) => category.id === targetParent?.id
      );
      if (updatedParent?.subCategories) {
        setLastDragInfo({
          type: "sub",
          subCategories: updatedParent.subCategories,
        });
      }

      return newCategories;
    });
    setDragApprove(true);
  };

  const handleEditSortCategory = async () => {
    let editSortCategories: {
      id: number;
      sortOrder: number;
    }[] = [];

    if (lastDragInfo?.type === "sub") {
      editSortCategories =
        lastDragInfo?.subCategories?.map((category, index) => ({
          id: category.id,
          sortOrder: index + 1,
        })) || [];
    } else {
      editSortCategories =
        localCategories?.map((category, index) => ({
          id: category.id,
          sortOrder: index + 1,
        })) || [];
    }

    const result = await editSortCategory({
      variables: {
        input: {
          editSortCategories,
        },
      },
    });
    return result.data?.editSortCategory.ok || false;
  };

  useEffect(() => {
    if (dragApprove) {
      handleEditSortCategory().then((success) => {
        if (success) {
          toast.success("순서가 바뀌었습니다!");
        } else {
          toast.error("데이터를 확인해주세요");
        }
      });
      setLastDragInfo(null);
      setDragApprove(false);
    }
  }, [dragApprove, lastDragInfo]);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => back()}
            className={`flex items-center space-x-2 mb-4 transition-colors cursor-pointer ${
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="space-y-2">
              <SortableContext
                items={localCategories?.map((c) => c.id.toString()) || []}
                strategy={verticalListSortingStrategy}
              >
                {localCategories?.map((parentCategory) => {
                  const isExpanded = expandedCategories?.has(
                    parentCategory.categoryTitle
                  );

                  return (
                    <SortableParentCategory
                      key={parentCategory.id}
                      parentCategory={parentCategory}
                      isDarkMode={isDarkMode}
                      isExpanded={isExpanded ?? false}
                      toggleCategoryExpand={toggleCategoryExpand}
                      handleEditModalOpen={handleEditModalOpen}
                      handleDeleteDialogOpen={handleDeleteDialogOpen}
                      setSelectedCategory={setSelectedCategory}
                      setIsParent={setIsParent}
                    >
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
                              <SortableContext
                                items={
                                  parentCategory.subCategories?.map((s) =>
                                    s.id.toString()
                                  ) || []
                                }
                                strategy={verticalListSortingStrategy}
                              >
                                {parentCategory.subCategories?.map(
                                  (subCategory) => (
                                    <SortableSubCategory
                                      key={subCategory.id}
                                      subCategory={subCategory as Category}
                                      isDarkMode={isDarkMode}
                                      handleEditModalOpen={handleEditModalOpen}
                                      handleDeleteDialogOpen={
                                        handleDeleteDialogOpen
                                      }
                                      setSelectedCategory={setSelectedCategory}
                                      setIsParent={setIsParent}
                                    />
                                  )
                                )}
                              </SortableContext>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </SortableParentCategory>
                  );
                })}
              </SortableContext>
            </div>
          </DndContext>
        </GlassCardMain>

        {/* Add Category Modal */}
        <CreateCategoryModal
          isAddModalOpen={isAddModalOpen}
          handleAddCategoryOpen={handleAddCategoryOpen}
          categories={categories || []}
        />

        {/* Edit Category Modal */}
        {selectedCategory && (
          <EditCategoryModal
            isEditModalOpen={isEditModalOpen}
            handleEditModalOpen={handleEditModalOpen}
            selectedCategory={selectedCategory}
          />
        )}

        {/* Delete Confirmation Dialog */}
        {selectedCategory && (
          <DeleteCategoryModal
            isDeleteDialogOpen={isDeleteDialogOpen}
            handleDeleteDialogOpen={handleDeleteDialogOpen}
            selectedCategory={selectedCategory}
            isParent={isParent}
          />
        )}
      </div>
    </>
  );
};

export default ManagementCategories;
