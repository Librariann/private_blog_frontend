import { ChevronRight, Edit, Trash2, GripVertical } from "lucide-react";
import { NewButton } from "../buttons/new-button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Category } from "@/gql/graphql";

type Props = {
  subCategory: Category;
  isDarkMode: boolean;
  handleEditModalOpen: (open: boolean) => void;
  handleDeleteDialogOpen: (open: boolean) => void;
  setSelectedCategory: (category: Category) => void;
  setIsParent: (isParent: boolean) => void;
};

const SortableSubCategory = ({
  subCategory,
  isDarkMode,
  handleEditModalOpen,
  handleDeleteDialogOpen,
  setSelectedCategory,
  setIsParent,
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: subCategory.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between px-4 py-2 rounded-lg ${
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
            className={`w-4 h-4 ${isDarkMode ? "text-white/40" : "text-gray-400"}`}
          />
        </div>

        <ChevronRight
          className={`w-4 h-4 ${isDarkMode ? "text-white/50" : "text-gray-400"}`}
        />
        <span className={isDarkMode ? "text-white/80" : "text-gray-700"}>
          {subCategory.categoryTitle}
        </span>
        <span
          className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
        >
          ({subCategory?.post?.length || 0}개 포스트)
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <NewButton
          variant="ghost"
          size="sm"
          onClick={() => {
            handleEditModalOpen(true);
            setSelectedCategory(subCategory);
          }}
          className={`cursor-pointer ${
            isDarkMode ? "text-white/70 hover:text-white hover:bg-white/10" : ""
          }`}
        >
          <Edit className="w-4 h-4" />
        </NewButton>
        <NewButton
          variant="ghost"
          size="sm"
          onClick={() => {
            handleDeleteDialogOpen(true);
            setSelectedCategory(subCategory);
            setIsParent(false);
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
  );
};

export default SortableSubCategory;
