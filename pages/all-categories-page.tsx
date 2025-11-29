import { GlassCardMain } from "@/components/main/main";
import {
  useGetCategories,
  useGetPopularHashTagList,
  useGetPostList,
} from "@/hooks/hooks";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { ArrowRight, TrendingUp } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import { useRouter } from "next/router";

const AllCategoriesPage = () => {
  const router = useRouter();
  const { isDarkMode } = useDarkModeStore();
  const { categories } = useGetCategories();
  console.log(categories);
  const popularHashTags = useGetPopularHashTagList();
  const totalSubCategories = categories?.reduce(
    (sum, category) =>
      sum +
      (category?.subCategories?.length === undefined
        ? 0
        : category.subCategories.length),
    0
  );
  const totalPostLength = categories
    ?.map((category) => {
      return category.subCategories?.reduce(
        (sum, subCategory) => sum + (subCategory.post?.length || 0),
        0
      );
    })
    .reduce((sum, count) => (sum || 0) + (count || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-8 mb-8">
        <h1 className={isDarkMode ? "text-white mb-2" : "text-gray-900 mb-2"}>
          카테고리
        </h1>
        <p className={isDarkMode ? "text-white/60" : "text-gray-500"}>
          관심 있는 주제별로 포스트를 탐색해보세요
        </p>
      </GlassCardMain>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCardMain $isDarkMode={isDarkMode} className="rounded-xl p-6">
          <div
            className={`mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            상위 카테고리
          </div>
          <div className={isDarkMode ? "text-white" : "text-gray-900"}>
            {categories.length}개
          </div>
        </GlassCardMain>
        <GlassCardMain $isDarkMode={isDarkMode} className="rounded-xl p-6">
          <div
            className={`mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            하위 카테고리
          </div>
          <div className={isDarkMode ? "text-white" : "text-gray-900"}>
            {totalSubCategories}개
          </div>
        </GlassCardMain>
        <GlassCardMain $isDarkMode={isDarkMode} className="rounded-xl p-6">
          <div
            className={`mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            총 포스트
          </div>
          <div className={isDarkMode ? "text-white" : "text-gray-900"}>
            {totalPostLength}개
          </div>
        </GlassCardMain>
      </div>

      {/* Category Hierarchy */}
      <div className="space-y-6">
        {categories?.map((parentCategory) => {
          const parentPostCount =
            parentCategory.subCategories?.reduce(
              (acc, category) => acc + (category.post?.length || 0),
              0
            ) || 0;

          return (
            <GlassCardMain
              key={parentCategory.categoryTitle}
              $isDarkMode={isDarkMode}
              className="rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${parentCategory.iconColor} flex items-center justify-center`}
                  >
                    <DynamicIcon
                      name={parentCategory.icon || ("code" as any)}
                      className="w-5 h-5"
                      color="white"
                    />
                  </div>
                  <div>
                    <h2
                      className={
                        isDarkMode ? "text-white mb-1" : "text-gray-900 mb-1"
                      }
                    >
                      {parentCategory.categoryTitle}
                    </h2>
                    <div
                      className={isDarkMode ? "text-white/60" : "text-gray-500"}
                    >
                      {parentCategory?.subCategories?.length}개 하위 카테고리 ·{" "}
                      {parentPostCount}개 포스트
                    </div>
                  </div>
                </div>
                {parentPostCount > 0 && (
                  <div
                    className={`flex items-center space-x-2 ${isDarkMode ? "text-green-400" : "text-green-600"}`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span>Active</span>
                  </div>
                )}
              </div>

              <div
                className={`mb-4 px-4 py-3 rounded-lg ${
                  isDarkMode
                    ? "bg-white/5 border border-white/10"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div
                  className={`mb-1 ${isDarkMode ? "text-white/50" : "text-gray-400"}`}
                >
                  최근 포스트
                </div>
                <div className={isDarkMode ? "text-white/80" : "text-gray-700"}>
                  {parentCategory.subCategories
                    ?.map((subCategory) => {
                      const sortedPost = subCategory.post?.toSorted((a, b) => {
                        return (
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                        );
                      });

                      return sortedPost?.[0];
                    })
                    .toSorted((a, b) => {
                      return (
                        new Date(b?.createdAt).getTime() -
                        new Date(a?.createdAt).getTime()
                      );
                    })?.[0]?.title || "최근 포스트가 없습니다."}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {parentCategory?.subCategories?.map((subCategory) => (
                  <button
                    key={subCategory.categoryTitle}
                    onClick={() =>
                      router.push(
                        `/post/${parentCategory.categoryTitle}/${subCategory.categoryTitle}`
                      )
                    }
                    className={`cursor-pointer group p-4 rounded-xl text-left transition-all ${
                      isDarkMode
                        ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30"
                        : "bg-white/60 hover:bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={isDarkMode ? "text-white" : "text-gray-900"}
                      >
                        {subCategory.categoryTitle}
                      </h3>
                      <ArrowRight
                        className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                          isDarkMode ? "text-blue-300" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={
                          isDarkMode ? "text-white/60" : "text-gray-500"
                        }
                      >
                        {subCategory?.post?.length}개 포스트
                      </span>
                      {subCategory?.post?.length! > 0 && (
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            isDarkMode
                              ? "bg-green-500/20 text-green-300"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          활성
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </GlassCardMain>
          );
        })}
      </div>

      {/* Popular Topics */}
      <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6 mt-8">
        <h2 className={isDarkMode ? "text-white mb-6" : "text-gray-900 mb-6"}>
          인기 주제
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularHashTags.slice(0, 8).map((topic) => (
            <div
              key={topic.hashtag}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                isDarkMode
                  ? "bg-white/5 hover:bg-white/10 border border-white/10"
                  : "bg-white/60 hover:bg-white border border-gray-200 hover:shadow-md"
              }`}
            >
              <div className={isDarkMode ? "text-white" : "text-gray-900"}>
                {topic.hashtag}
              </div>
              <div className={isDarkMode ? "text-white/60" : "text-gray-500"}>
                {topic.count}개
              </div>
            </div>
          ))}
        </div>
      </GlassCardMain>
    </div>
  );
};

export default AllCategoriesPage;
