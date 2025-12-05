import React, { useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { popularHashTagsProps } from "@/pages";
import { BlogPostCard, glassCardTypes } from "../cards/blog-post-card";
import { Post } from "@/gql/graphql";
import Mobile from "./mobile";
import Desktop from "./desktop";
import { useRouter } from "next/router";
import { useGetCategories } from "@/hooks/hooks";
import styled from "styled-components";
import Head from "next/head";
import { useUserInfoStore } from "@/stores/useUserInfoStore";
import BlogPostCard2 from "../cards/blog-post-card2";
import { motion } from "motion/react";

const Main = ({
  posts,
  popularHashTags,
  featuredPost,
}: {
  posts: Post[];
  popularHashTags: popularHashTagsProps[];
  featuredPost: Post;
}) => {
  const router = useRouter();
  const { isDarkMode } = useDarkModeStore();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const { userInfo } = useUserInfoStore();
  const { categories, categoriesLoading } = useGetCategories();
  useEffect(() => {
    if (!categoriesLoading) {
      const expandCategory = categories[0]?.categoryTitle;

      setExpandedCategories(new Set([expandCategory]));
    }
  }, [categories, categoriesLoading]);

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
    <>
      <Head>
        <title>{userInfo?.nickname}&apos;s Blog | 개발 블로그</title>
        <meta
          name="description"
          content={`${userInfo?.nickname}의 블로그. 개발 관련 기술 포스트와 경험을 공유합니다. 총 ${posts.length}개의 포스트를 만나보세요.`}
        />
        <meta property="og:title" content={`${userInfo?.nickname}'s Blog`} />
        <meta
          property="og:description"
          content={`Frontend, Backend, DevOps 기술 블로그 - ${posts.length}개의 포스트`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://librarian-blog.dev" />
        <meta property="og:image" content={posts[0]?.thumbnailUrl ?? ""} />
      </Head>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Featured Post */}
            <GlassCardMain $isDarkMode={isDarkMode} className="rounded-2xl p-8">
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
                {featuredPost.title}
              </h2>
              <p
                className={`mb-6 ${
                  isDarkMode ? "text-white/70" : "text-gray-600"
                }`}
              >
                {featuredPost.excerpt}
              </p>
              <button
                onClick={() =>
                  router.push(
                    `/post/${featuredPost.category?.parentCategory?.categoryTitle}/${featuredPost.category?.categoryTitle}/@Post-${featuredPost.id}`
                  )
                }
                className={`px-6 py-3 rounded-lg transition-all cursor-pointer ${
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
              categories={categories}
              expandedCategories={expandedCategories}
              toggleCategoryExpand={toggleCategoryExpand}
            />

            {/* Blog Posts */}
            <div className="space-y-6">
              {posts?.slice(0, 5).map((post) => (
                <>
                  <BlogPostCard2
                    key={post.id}
                    post={post}
                    mainYn={true}
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
                </>
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
            categories={categories}
            expandedCategories={expandedCategories}
            toggleCategoryExpand={toggleCategoryExpand}
            popularHashTags={popularHashTags}
          />
        </div>
      </main>
    </>
  );
};

export const GlassCardMain = styled.div<glassCardTypes>`
  background: ${(props) =>
    props.$isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(255, 255, 255, 0.7)"};
  backdrop-filter: ${(props) =>
    props.$isDarkMode ? "blur(4px)" : "blur(10px)"};
  -webkit-backdrop-filter: ${(props) =>
    props.$isDarkMode ? "blur(4px)" : "blur(10px)"};
  border: ${(props) =>
    props.$isDarkMode
      ? "1px solid rgba(255, 255, 255, 0.2)"
      : "1px solid rgba(0, 0, 0, 0.05)"};
  box-shadow: ${(props) =>
    props.$isDarkMode
      ? "0 8px 32px 0 rgba(0, 0, 0, 0.1)"
      : "0 8px 32px 0 rgba(0, 0, 0, 0.08)"};
`;

export const MemoizedMain = React.memo(Main);
