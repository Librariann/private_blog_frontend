import { useEffect, useState } from "react";
import { Code2, Code, Database, Globe, Rocket } from "lucide-react";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { popularHashTagsProps } from "@/pages";
import { BlogPostCard, glassCardTypes } from "../cards/blog-post-card";
import { GetPostListQuery, Post } from "@/gql/graphql";
import Mobile from "./mobile";
import Desktop from "./desktop";
import { useRouter } from "next/router";
import { useGetCategoryCounts } from "@/hooks/hooks";
import styled from "styled-components";

const Main = ({
  posts,
  popularHashTags,
}: {
  posts: Post[];
  popularHashTags: popularHashTagsProps[];
}) => {
  const router = useRouter();
  const iconList = [
    {
      icon: Code,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Code2,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Database,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      color: "from-yellow-500 to-amber-500",
    },
  ];
  const { isDarkMode } = useDarkModeStore();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [categories, setCategories] = useState<any[]>([]);
  const { countsData, countsLoading } = useGetCategoryCounts();

  useEffect(() => {
    if (!countsLoading) {
      const categories = countsData || [];
      const expandCategory = categories[0]?.categoryTitle;

      setExpandedCategories(new Set([expandCategory]));
      setCategories(categories);
    }
  }, [countsLoading, countsData]);

  const toggleCategoryExpand = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Featured Post */}
          <GlassCardMain isDarkMode={isDarkMode} className="rounded-2xl p-8">
            <div className="flex items-center space-x-2 mb-4">
              <Rocket
                className={`w-5 h-5 ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <span
                className={isDarkMode ? "text-purple-400" : "text-purple-600"}
              >
                Featured
              </span>
            </div>
            <h2
              className={`mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              {posts?.[0]?.title}
            </h2>
            <p
              className={`mb-6 ${
                isDarkMode ? "text-white/70" : "text-gray-600"
              }`}
            >
              React 19에서 추가된 Server Components, Actions, 그리고 새로운
              Hooks에 대해 알아봅니다.
            </p>
            <button
              onClick={() =>
                router.push(
                  `/post/${posts?.[0].category.parentCategoryTitle}/${posts?.[0].category.categoryTitle}/@Post-${posts?.[0].id}`
                )
              }
              className={`px-6 py-3 rounded-lg transition-all ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-white border border-white/20"
                  : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
              }`}
            >
              Read More
            </button>
          </GlassCardMain>

          {/* Sidebar - Mobile Only */}
          <Mobile
            isDarkMode={isDarkMode}
            categories={categories}
            iconList={iconList}
            expandedCategories={expandedCategories}
            toggleCategoryExpand={toggleCategoryExpand}
          />

          {/* Blog Posts */}
          <div className="space-y-6">
            {posts?.slice(0, 5).map((post) => (
              <BlogPostCard
                key={post.id}
                post={post}
                onClick={() =>
                  router.push(
                    `/post/${post.category.parentCategoryTitle}/${post.category.categoryTitle}/@Post-${post.id}`
                  )
                }
              />
            ))}
          </div>

          <button
            className={`w-full px-6 py-4 rounded-xl transition-all cursor-pointer ${
              isDarkMode
                ? "glass-card-hover border border-white/10 text-white"
                : "glass-card-light-hover border border-gray-200 text-gray-900"
            }`}
            onClick={() => {
              router.push("/all-posts-page");
            }}
          >
            모든 포스트 보기 →
          </button>
        </div>

        {/* Sidebar - Desktop Only */}
        <Desktop
          isDarkMode={isDarkMode}
          categories={categories}
          iconList={iconList}
          expandedCategories={expandedCategories}
          toggleCategoryExpand={toggleCategoryExpand}
          popularHashTags={popularHashTags}
        />
      </div>
    </main>
  );
};

export const GlassCardMain = styled.div<glassCardTypes>`
  background: ${(props) =>
    props.isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.7)"};
  backdrop-filter: ${(props) =>
    props.isDarkMode ? "blur(4px)" : "blur(10px)"};
  -webkit-backdrop-filter: ${(props) =>
    props.isDarkMode ? "blur(4px)" : "blur(10px)"};
  border: ${(props) =>
    props.isDarkMode
      ? "1px solid rgba(255, 255, 255, 0.2)"
      : "1px solid rgba(0, 0, 0, 0.05)"};
  box-shadow: ${(props) =>
    props.isDarkMode
      ? "0 8px 32px 0 rgba(0, 0, 0, 0.1)"
      : "0 8px 32px 0 rgba(0, 0, 0, 0.08)"};
`;

export default Main;
