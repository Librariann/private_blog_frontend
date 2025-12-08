import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { DesktopAndMobileProps } from "./desktop";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { GlassCardMain } from "./main";
import { useRouter } from "next/router";

const Mobile = ({
  categories,
  expandedCategories,
  toggleCategoryExpand,
}: DesktopAndMobileProps) => {
  const { isDarkMode } = useDarkModeStore();
  const router = useRouter();
  return (
    <>
      {/* Categories Section - Mobile Only */}
      <GlassCardMain
        $isDarkMode={isDarkMode}
        className="lg:hidden rounded-2xl p-6"
      >
        <h3 className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          카테고리
        </h3>

        <div className="space-y-2">
          {categories.map((parent, index) => {
            const isExpanded = expandedCategories.has(parent.categoryTitle);

            return (
              <div key={parent.categoryTitle}>
                {/* 상위 카테고리 */}
                <button
                  onClick={() => toggleCategoryExpand(parent.categoryTitle)}
                  className={`cursor-pointer w-full flex items-center justify-between ${parent.iconColor} px-3 py-2 rounded-lg transition-all ${
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
                        name={(parent.icon || "code") as IconName}
                      />
                    </div>
                    <span className="text-sm">{parent.categoryTitle}</span>
                  </div>
                  <span
                    className={`text-sm ${
                      isDarkMode ? "text-white/50" : "text-gray-400"
                    }`}
                  ></span>
                </button>

                {/* 하위 카테고리 */}
                <AnimatePresence initial={false}>
                  {isExpanded &&
                    parent.subCategories &&
                    parent.subCategories.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="ml-11 mt-1 space-y-1">
                          {parent.subCategories.map((subCategory, index) => (
                            <motion.button
                              key={subCategory.categoryTitle}
                              onClick={() =>
                                router.push(
                                  `/post/${parent.categoryTitle}/${subCategory.categoryTitle}`
                                )
                              }
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.05,
                                ease: "easeOut",
                              }}
                              className={`cursor-pointer w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
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
                                  {subCategory.post?.length}
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

        <button
          className={`mt-4 w-full px-4 py-2 rounded-lg transition-colors ${
            isDarkMode
              ? "bg-white/5 hover:bg-white/10 text-white/70 border border-white/10"
              : "bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200"
          }`}
        >
          모든 카테고리 보기
        </button>
      </GlassCardMain>
    </>
  );
};

export default Mobile;
