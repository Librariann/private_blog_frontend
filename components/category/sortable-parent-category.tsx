import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { ChevronDown, Edit, Trash2, GripVertical } from "lucide-react";
import { motion } from "motion/react";
import { NewButton } from "../buttons/new-button";
import { SelectedCategoryType } from "@/pages/settings/management-categories";

type Props = {
  parentCategory: SelectedCategoryType[number];
  isDarkMode: boolean;
  isExpanded: boolean;
  toggleCategoryExpand: (title: string) => void;
  handleEditModalOpen: (open: boolean) => void;
  handleDeleteDialogOpen: (open: boolean) => void;
  setSelectedCategory: (category: SelectedCategoryType[number]) => void;
  setIsParent: (isParent: boolean) => void;
  children?: React.ReactNode;
};

const SortableParentCategory = ({
  parentCategory,
  isDarkMode,
  isExpanded,
  toggleCategoryExpand,
  handleEditModalOpen,
  handleDeleteDialogOpen,
  setSelectedCategory,
  setIsParent,
  children,
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: parentCategory?.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className={`flex items-center justify-between px-4 py-3 rounded-lg ${
          isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-50"
        }`}
      >
        <div className="flex items-center space-x-3 flex-1">
          {/* Drag Handle - 여기에만 listeners 적용 */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200/20 rounded transition-colors"
          >
            <GripVertical
              className={`w-5 h-5 ${isDarkMode ? "text-white/40" : "text-gray-400"}`}
            />
          </div>

          <button
            onClick={() => toggleCategoryExpand(parentCategory.categoryTitle)}
            className="p-1 cursor-pointer"
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
              name={(parentCategory.icon as IconName) || "code"}
            />
          </div>

          <div className="flex-1">
            <div
              onClick={() => toggleCategoryExpand(parentCategory.categoryTitle)}
              className={`flex items-center gap-3 cursor-pointer ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              <span>{parentCategory.categoryTitle}</span>
              <span
                className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
              >
                (
                {parentCategory?.subCategories?.reduce(
                  (sum: number, sub) => sum + (sub?.post?.length || 0),
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
            }}
            className={`cursor-pointer ${
              isDarkMode
                ? "text-white/70 hover:text-white hover:bg-white/10"
                : ""
            }`}
          >
            <Edit className="w-4 h-4" />
          </NewButton>
          <NewButton
            variant="ghost"
            size="sm"
            onClick={() => {
              handleDeleteDialogOpen(true);
              setSelectedCategory(parentCategory);
              setIsParent(true);
            }}
            className={`cursor-pointer ${
              isDarkMode
                ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                : "text-red-600"
            }`}
          >
            <Trash2 className="w-4 h-4" />
          </NewButton>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SortableParentCategory;
