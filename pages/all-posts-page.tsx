import {
  useGetCategories,
  useGetPopularHashTagList,
  useGetPostList,
} from "@/hooks/hooks";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useMemo, useState } from "react";
import { BlogPostCard } from "@/components/cards/blog-post-card";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Search } from "lucide-react";
import { GlassCardMain } from "@/components/main/main";
import Head from "next/head";
import { useUserInfoStore } from "@/stores/useUserInfoStore";
import BlogPostCard2 from "@/components/cards/blog-post-card2";

const AllPostsPage = () => {
  const { categories } = useGetCategories();
  const { userInfo } = useUserInfoStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedParents, setExpandedParents] = useState<Set<string>>(
    new Set()
  );
  const router = useRouter();
  const posts = useGetPostList();
  const popularHashTags = useGetPopularHashTagList();

  const { isDarkMode } = useDarkModeStore();

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      post.category?.categoryTitle === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleParentCategory = (parentName: string) => {
    const newExpanded = new Set(expandedParents);
    if (newExpanded.has(parentName)) {
      newExpanded.delete(parentName);
    } else {
      newExpanded.add(parentName);
    }
    setExpandedParents(newExpanded);
  };

  return (
    <>
      <Head>
        <title>모든 포스트 | {userInfo?.nickname}&apos;s blog</title>
        <meta
          name="description"
          content={`총 ${posts.length}개의 포스트를 읽어보세요. 카테고리별로 분류된 다양한 주제의 글을 확인할 수 있습니다.`}
        />
        <meta
          property="og:title"
          content={`모든 포스트 | ${userInfo?.nickname}&apos;s blog`}
        />
        <meta
          property="og:description"
          content={`총 ${posts.length}개의 포스트를 읽어보세요`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://librarian-blog.dev/all-posts-page"
        />
      </Head>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <GlassCardMain
          $isDarkMode={isDarkMode}
          className="rounded-2xl p-8 mb-8"
        >
          <h1 className={isDarkMode ? "text-white mb-2" : "text-gray-900 mb-2"}>
            모든 포스트
          </h1>
          <p className={isDarkMode ? "text-white/60" : "text-gray-500"}>
            {posts.length}개의 포스트를 읽어보세요
          </p>
        </GlassCardMain>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-4">
            <GlassCardMain $isDarkMode={isDarkMode} className="rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Search
                  className={`w-5 h-5 ${isDarkMode ? "text-white/60" : "text-gray-400"}`}
                />
                <input
                  type="text"
                  placeholder="포스트 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`flex-1 bg-transparent outline-none ${
                    isDarkMode
                      ? "text-white placeholder-white/40"
                      : "text-gray-900 placeholder-gray-400"
                  }`}
                />
              </div>
            </GlassCardMain>
          </div>

          {/* 검색필터 추후 구현 */}
          {/* <div
          className={`rounded-xl p-4 ${isDarkMode ? "glass-card" : "glass-card-light"}`}
        >
          <button
            className={`flex items-center justify-center space-x-2 w-full ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>필터</span>
          </button>
        </div> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <GlassCardMain $isDarkMode={isDarkMode} className="rounded-xl p-4">
              <h3
                className={
                  isDarkMode ? "text-white mb-4" : "text-gray-900 mb-4"
                }
              >
                카테고리
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === "all"
                      ? isDarkMode
                        ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                        : "bg-blue-100 text-blue-700 border border-blue-300"
                      : isDarkMode
                        ? "text-white/70 hover:bg-white/5"
                        : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>전체 포스트</span>
                    <span
                      className={isDarkMode ? "text-white/50" : "text-gray-400"}
                    >
                      {posts.length}
                    </span>
                  </div>
                </button>

                {categories?.map((parent) => (
                  <div key={parent.categoryTitle} className="mt-2">
                    <button
                      onClick={() => toggleParentCategory(parent.categoryTitle)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center justify-between ${
                        isDarkMode
                          ? "text-white/80 hover:bg-white/5"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{
                            rotate: expandedParents.has(parent.categoryTitle)
                              ? 0
                              : -90,
                          }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                        <span>{parent.categoryTitle}</span>
                      </div>
                      <span
                        className={
                          isDarkMode ? "text-white/50" : "text-gray-400"
                        }
                      >
                        {parent.subCategories?.reduce(
                          (acc, category) => acc + (category.post?.length || 0),
                          0
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedParents.has(parent.categoryTitle) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="ml-6 mt-1 space-y-1">
                            {parent?.subCategories?.map(
                              (subCategory, index) => (
                                <motion.button
                                  key={subCategory.categoryTitle}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{
                                    duration: 0.2,
                                    delay: index * 0.05,
                                    ease: "easeOut",
                                  }}
                                  onClick={() =>
                                    setSelectedCategory(
                                      subCategory.categoryTitle
                                    )
                                  }
                                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                                    selectedCategory ===
                                    subCategory.categoryTitle
                                      ? isDarkMode
                                        ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                                        : "bg-purple-100 text-purple-700 border border-purple-300"
                                      : isDarkMode
                                        ? "text-white/70 hover:bg-white/5"
                                        : "text-gray-600 hover:bg-gray-50"
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
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Popular Tags */}
              <div
                className={`mt-8 pt-6 border-t ${isDarkMode ? "border-white/10" : "border-gray-200"}`}
              >
                <h3
                  className={
                    isDarkMode ? "text-white mb-4" : "text-gray-900 mb-4"
                  }
                >
                  인기 태그
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularHashTags.map((tag) => (
                    <span
                      key={tag.hashtag}
                      className={`px-2 py-1 rounded text-xs cursor-pointer transition-all ${
                        isDarkMode
                          ? "bg-white/10 text-white/80 hover:bg-white/20"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      #{tag.hashtag}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCardMain>
          </div>

          {/* Posts Grid */}
          <div className="lg:col-span-3">
            <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2
                    className={
                      isDarkMode ? "text-white mb-1" : "text-gray-900 mb-1"
                    }
                  >
                    {selectedCategory === "all"
                      ? "전체 포스트"
                      : selectedCategory}
                  </h2>
                  <p className={isDarkMode ? "text-white/60" : "text-gray-500"}>
                    {filteredPosts.length}개의 포스트
                  </p>
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post, index) => (
                    <div key={post.id}>
                      <BlogPostCard2
                        key={post.id}
                        post={post}
                        index={index}
                        onClick={() =>
                          router.push(
                            `/post/${post.category?.parentCategory?.categoryTitle}/${post.category?.categoryTitle}/@Post-${post.id}`
                          )
                        }
                      />
                      {/* <BlogPostCard
                        key={post.id}
                        post={post}
                        onClick={() =>
                          router.push(
                            `/post/${post.category?.parentCategory?.categoryTitle}/${post.category?.categoryTitle}/@Post-${post.id}`
                          )
                        }
                      /> */}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={`text-center py-16 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
                >
                  <p>검색 결과가 없습니다.</p>
                  <p className="mt-2">다른 키워드로 검색해보세요.</p>
                </div>
              )}
            </GlassCardMain>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPostsPage;
