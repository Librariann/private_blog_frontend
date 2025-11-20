import { GlassCardMain } from "@/components/main/main";
import {
  useGetCategoryCounts,
  useGetPopularHashTagList,
  useGetPostList,
} from "@/hooks/hooks";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useRouter } from "next/router";

const AllCategoriesPage = () => {
  const router = useRouter();
  const { isDarkMode } = useDarkModeStore();
  const posts = useGetPostList();
  const categories = useGetCategoryCounts();
  const popularHashTags = useGetPopularHashTagList();
  const totalSubCategories = categories?.countsData?.reduce(
    (sum, category) =>
      sum +
      (category?.children?.length === undefined ? 0 : category.children.length),
    0
  );

  // // 각 상위 카테고리별 총 포스트 수 계산
  const getParentCategoryStats = (parentCategoryTitle: string) => {
    return posts.filter(
      (post) => post.category.parentCategoryTitle === parentCategoryTitle
    ).length;
  };

  // // 최근 포스트 가져오기
  const getLatestPost = (parentCategoryTitle: string) => {
    const categoryPosts = posts.filter(
      (post) => post.category.parentCategoryTitle === parentCategoryTitle
    );
    return categoryPosts.length > 0 ? categoryPosts[0].title : "포스트 없음";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <GlassCardMain isDarkMode={isDarkMode} className="rounded-2xl p-8 mb-8">
        <h1 className={isDarkMode ? "text-white mb-2" : "text-gray-900 mb-2"}>
          카테고리
        </h1>
        <p className={isDarkMode ? "text-white/60" : "text-gray-500"}>
          관심 있는 주제별로 포스트를 탐색해보세요
        </p>
      </GlassCardMain>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCardMain isDarkMode={isDarkMode} className="rounded-xl p-6">
          <div
            className={`mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            상위 카테고리
          </div>
          <div className={isDarkMode ? "text-white" : "text-gray-900"}>
            {categories.countsData?.length}개
          </div>
        </GlassCardMain>
        <GlassCardMain isDarkMode={isDarkMode} className="rounded-xl p-6">
          <div
            className={`mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            하위 카테고리
          </div>
          <div className={isDarkMode ? "text-white" : "text-gray-900"}>
            {totalSubCategories}개
          </div>
        </GlassCardMain>
        <GlassCardMain isDarkMode={isDarkMode} className="rounded-xl p-6">
          <div
            className={`mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            총 포스트
          </div>
          <div className={isDarkMode ? "text-white" : "text-gray-900"}>
            {posts.length}개
          </div>
        </GlassCardMain>
      </div>

      {/* Category Hierarchy */}
      <div className="space-y-6">
        {categories?.countsData?.map((parentCategory) => {
          // const Icon = parentCategory.icon;
          const parentPostCount = getParentCategoryStats(
            parentCategory.categoryTitle
          );
          const latestPost = getLatestPost(parentCategory.categoryTitle);

          return (
            <GlassCardMain
              key={parentCategory.categoryTitle}
              isDarkMode={isDarkMode}
              className="rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {/* <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${parentCategory.color} flex items-center justify-center`}
                  > */}
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center`}
                  >
                    {/* <Icon className="w-8 h-8 text-white" /> */}
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
                      {parentCategory?.children?.length}개 하위 카테고리 ·{" "}
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

              {parentPostCount > 0 && (
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
                  <div
                    className={isDarkMode ? "text-white/80" : "text-gray-700"}
                  >
                    {latestPost}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {parentCategory?.children?.map((subCategory) => (
                  <button
                    key={subCategory.categoryTitle}
                    onClick={() =>
                      router.push(
                        `/post/${parentCategory.categoryTitle}/${subCategory.categoryTitle}`
                      )
                    }
                    // onClick={() => onCategoryClick(subCategory.name)}
                    className={`group p-4 rounded-xl text-left transition-all ${
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
                        {subCategory.count}개 포스트
                      </span>
                      {subCategory.count > 0 && (
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
      <GlassCardMain isDarkMode={isDarkMode} className="rounded-2xl p-6 mt-8">
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
