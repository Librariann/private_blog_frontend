import { ChevronDown, LucideProps } from "lucide-react";
import ProfileSidebar from "./profile-side-bar";
import { AnimatePresence, motion } from "framer-motion";
import { CategoryCount } from "@/gql/graphql";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { popularHashTagsProps } from "@/pages";
import { useRouter } from "next/router";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { GlassCardMain } from "./main";
import { useUserInfoStore } from "@/stores/useUserInfoStore";
import { DynamicIcon } from "lucide-react/dynamic";

export type DesktopAndMobileProps = {
  categories: CategoryCount[];
  expandedCategories: Set<string>;
  toggleCategoryExpand: (categoryName: string) => void;
  popularHashTags?: popularHashTagsProps[];
};

const Desktop = ({
  categories,
  expandedCategories,
  toggleCategoryExpand,
  popularHashTags,
}: DesktopAndMobileProps) => {
  const router = useRouter();
  const { isDarkMode } = useDarkModeStore();

  return (
    <aside className="hidden lg:block lg:col-span-4 space-y-6">
      <ProfileSidebar />

      {/* Categories */}
      <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6 ">
        <h3 className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          카테고리
        </h3>
        <div className="space-y-1">
          {categories.map((parent, index) => {
            const isExpanded = expandedCategories.has(parent.categoryTitle);
            const hasChildren = parent.children && parent.children.length > 0;
            return (
              <div key={parent.categoryTitle}>
                {/* 상위 카테고리 */}
                <button
                  onClick={() => toggleCategoryExpand(parent.categoryTitle)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all cursor-pointer ${
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
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${parent.iconColor} flex items-center justify-center`}
                    >
                      <DynamicIcon
                        className="w-4 h-4"
                        color="white"
                        name={(parent.icon as any) || "code"}
                      />
                    </div>
                    <span>{parent.categoryTitle}</span>
                  </div>
                  <span
                    className={isDarkMode ? "text-white/50" : "text-gray-400"}
                  >
                    {hasChildren
                      ? parent?.children?.reduce(
                          (sum, sub) => sum + sub?.count!,
                          0
                        )
                      : parent?.count}
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
                          {parent.children.map((subCategory, index) => (
                            <span
                              key={subCategory.categoryTitle}
                              onClick={() =>
                                router.push(
                                  `/post/${parent.categoryTitle}/${subCategory.categoryTitle}`
                                )
                              }
                            >
                              <motion.button
                                initial={{ x: -10, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                  duration: 0.2,
                                  delay: index * 0.05,
                                  ease: "easeOut",
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-all cursor-pointer ${
                                  isDarkMode
                                    ? "text-white/70 hover:bg-white/10 hover:text-white"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{subCategory.categoryTitle}</span>
                                  <span
                                    className={
                                      isDarkMode
                                        ? "text-white/50"
                                        : "text-gray-400"
                                    }
                                  >
                                    {subCategory.count}
                                  </span>
                                </div>
                              </motion.button>
                            </span>
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
      <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6 ">
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
      </GlassCardMain>
    </aside>
  );
};

export default Desktop;
