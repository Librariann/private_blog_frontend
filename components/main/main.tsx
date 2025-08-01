import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Code2,
  Code,
  Database,
  Globe,
  Rocket,
} from "lucide-react";
import PostDetail from "../post-detail";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { PostsProps } from "@/pages";
import { BlogPostCard } from "../cards/blog-post-card";
import ProfileSidebar from "../sidebar/profile-side-bar";
import {
  GetCategoriesCountsQuery,
  GetCategoriesCountsQueryVariables,
} from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES_COUNTS_QUERY } from "@/lib/queries";
import Mobile from "./mobile";
import Desktop from "./desktop";
import Link from "next/link";
import { useRouter } from "next/router";

const blogPosts = [
  {
    id: 1,
    title: "React 19의 새로운 기능들",
    excerpt:
      "React 19에서 추가된 Server Components, Actions, 그리고 새로운 Hooks에 대해 알아봅니다.",
    date: "2025년 11월 10일",
    readTime: "5분",
    tags: ["React", "JavaScript", "Frontend"],
    category: "Frontend",
    parentCategory: "개발",
  },
  {
    id: 2,
    title: "TypeScript 5.0 완벽 가이드",
    excerpt:
      "TypeScript 5.0의 decorators, const type parameters 등 새로운 기능들을 실전 예제와 함께 살펴봅니다.",
    date: "2025년 11월 5일",
    readTime: "8분",
    tags: ["TypeScript", "JavaScript"],
    category: "Backend",
    parentCategory: "발",
  },
  {
    id: 3,
    title: "Next.js App Router 마스터하기",
    excerpt:
      "Next.js 14의 App Router를 활용한 모던 웹 애플리케이션 구축 방법을 단계별로 설명합니다.",
    date: "2025년 10월 28일",
    readTime: "10분",
    tags: ["Next.js", "React", "SSR"],
    category: "Frontend",
    parentCategory: "개발",
  },
  {
    id: 4,
    title: "PostgreSQL 성능 최적화 팁",
    excerpt:
      "쿼리 최적화, 인덱싱 전략, 그리고 실제 프로덕션 환경에서의 성능 개선 사례를 공유합니다.",
    date: "2025년 10월 20일",
    readTime: "12분",
    tags: ["PostgreSQL", "Database", "Performance"],
    category: "Database",
    parentCategory: "데이터",
  },
  {
    id: 5,
    title: "Docker로 개발 환경 구성하기",
    excerpt:
      "Docker와 Docker Compose를 활용하여 일관된 개발 환경을 구축하는 방법을 알아봅니다.",
    date: "2025년 10월 15일",
    readTime: "7분",
    tags: ["Docker", "DevOps"],
    category: "DevOps",
    parentCategory: "개발",
  },
  {
    id: 6,
    title: "웹 성능 최적화 체크리스트",
    excerpt:
      "Core Web Vitals 개선을 위한 실용적인 최적화 기법들을 체크리스트 형태로 정리했습니다.",
    date: "2025년 10월 8일",
    readTime: "6분",
    tags: ["Performance", "Web", "Optimization"],
    category: "Web Performance",
    parentCategory: "웹",
  },
];

const Main = ({ posts }: { posts: PostsProps[] }) => {
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
  const { loading, data: getCategoryDatas } = useQuery<
    GetCategoriesCountsQuery,
    GetCategoriesCountsQueryVariables
  >(GET_CATEGORIES_COUNTS_QUERY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (!loading) {
      const categories =
        getCategoryDatas?.getCategoriesCounts?.categoryCounts || [];
      const expandCategory = categories[0].categoryTitle;

      setExpandedCategories(new Set([expandCategory]));
      setCategories(categories);
    }
  }, [loading, getCategoryDatas]);

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
    <div
      className={`min-h-screen relative overflow-hidden ${
        isDarkMode ? "dark" : "light"
      }`}
    >
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        {isDarkMode ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604781109199-ced99b89b0f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyOTcxMjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')] bg-cover bg-center opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-purple-950/20"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100"></div>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Featured Post */}
            <div
              className={`rounded-2xl p-8 ${
                isDarkMode ? "glass-card" : "glass-card-light"
              }`}
            >
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
                className={`mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {posts[0].title}
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
                    `/post/${posts[0].category.parentCategoryTitle}/${posts[0].category.categoryTitle}/@Post-${posts[0].id}`
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
            </div>

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
              {posts.slice(0, 5).map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  isDarkMode={isDarkMode}
                  onClick={() =>
                    router.push(
                      `/post/${post.category.parentCategoryTitle}/${post.category.categoryTitle}/@Post-${post.id}`
                    )
                  }
                />
              ))}
            </div>

            <button
              className={`w-full px-6 py-4 rounded-xl transition-all ${
                isDarkMode
                  ? "glass-card-hover border border-white/10 text-white"
                  : "glass-card-light-hover border border-gray-200 text-gray-900"
              }`}
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
          />
        </div>
      </main>
    </div>
  );
};

export default Main;
