import { ChevronDown, LucideProps } from "lucide-react";
import ProfileSidebar from "./profile-side-bar";
import { AnimatePresence, motion } from "framer-motion";
import { CategoryCount } from "@/gql/graphql";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { popularHashTagsProps } from "@/pages";

export type DesktopAndMobileProps = {
  isDarkMode: boolean;
  categories: CategoryCount[];
  iconList: {
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    color: string;
  }[];
  expandedCategories: Set<string>;
  toggleCategoryExpand: (categoryName: string) => void;
  popularHashTags?: popularHashTagsProps[];
};

const Desktop = ({
  isDarkMode,
  categories,
  iconList,
  expandedCategories,
  toggleCategoryExpand,
  popularHashTags,
}: DesktopAndMobileProps) => {
  return (
    <aside className="hidden lg:block lg:col-span-4 space-y-6">
      <ProfileSidebar isDarkMode={isDarkMode} />

      {/* Categories */}
      <div
        className={`rounded-2xl p-6 ${
          isDarkMode ? "glass-card" : "glass-card-light"
        }`}
      >
        <h3 className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          카테고리
        </h3>
        <div className="space-y-1">
          {categories.map((parent, index) => {
            const Icon = iconList[index].icon;
            const isExpanded = expandedCategories.has(parent.categoryTitle);
            const hasChildren = parent.children && parent.children.length > 0;
            return (
              <div key={parent.categoryTitle}>
                {/* 상위 카테고리 */}
                <button
                  onClick={() => toggleCategoryExpand(parent.categoryTitle)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                    isDarkMode
                      ? "text-white/80 hover:bg-white/5"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: isExpanded ? 0 : -90 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${iconList[index].color} flex items-center justify-center`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span>{parent.categoryTitle}</span>
                  </div>
                  <span
                    className={isDarkMode ? "text-white/50" : "text-gray-400"}
                  >
                    {hasChildren
                      ? parent.children!.reduce(
                          (sum, sub) => sum + sub.count,
                          0
                        )
                      : parent.count}
                  </span>
                </button>

                {/* 하위 카테고리 */}
                <AnimatePresence initial={false}>
                  {isExpanded &&
                    parent.children &&
                    parent.children.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="ml-11 mt-1 space-y-1">
                          {parent.children.map((subCat, index) => (
                            <motion.button
                              key={subCat.categoryTitle}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.05,
                                ease: "easeOut",
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                isDarkMode
                                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{subCat.categoryTitle}</span>
                                <span
                                  className={
                                    isDarkMode
                                      ? "text-white/50"
                                      : "text-gray-400"
                                  }
                                >
                                  {subCat.count}
                                </span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`rounded-2xl p-6 ${
          isDarkMode ? "glass-card" : "glass-card-light"
        }`}
      >
        <h3 className={isDarkMode ? "text-white mb-4" : "text-gray-900 mb-4"}>
          인기 태그
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularHashTags?.map((tag) => (
            <span
              key={tag.hashtag}
              className={`px-3 py-1 backdrop-blur-sm rounded-full border transition-all cursor-pointer ${
                isDarkMode
                  ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              }`}
            >
              #{tag.hashtag}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Desktop;
