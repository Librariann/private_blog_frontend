import { ArrowLeft, Calendar, Clock, List } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "../ui/badge";
import { Post } from "@/gql/graphql";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import dynamic from "next/dynamic";
import Comments from "../comments/comments";
import PostNavigation from "./post-navigation";
import PostTags from "./post-tags";

type topicProps = {
  id: string;
  title: string;
}[];
export type PostDetailPageProps = {
  post: Post;
  // onBack: () => void;
  // allPosts: Post[];
  // onPostClick: (post: Post) => void;
};

const PostDetail = ({
  post,
  // onBack,
  // allPosts,
  // onPostClick,
}: PostDetailPageProps) => {
  const { isDarkMode } = useDarkModeStore();
  const [isTocOpen, setIsTocOpen] = useState(true);

  // 목차 항목들
  const tocItems: topicProps = [];
  const filterH1 = post.contents
    .match(/^#\s+(.+)/gm)
    ?.map((match) => match.replace(/^#\s+/, ""));

  filterH1?.map((h1) => {
    const items = {
      id: h1.replace(" ", "-"),
      title: h1,
    };
    tocItems.push(items);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    console.log(element);
    if (element) {
      const offset = 100; // 헤더 높이만큼 여유
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      console.log(offsetPosition);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // 포맷팅된 날짜 (클라이언트에서만)
  const formattedDate = new Date(post.createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const EditerMarkdown = dynamic(
    () =>
      import("@uiw/react-md-editor").then((mod) => {
        return mod.default.Markdown;
      }),
    { ssr: false }
  );

  // 이전/다음 포스트 찾기
  // const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  // const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  // const nextPost =
  //   currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Back Button */}
      <button
        // onClick={onBack}
        className={`flex items-center space-x-2 mb-4 sm:mb-6 transition-colors ${
          isDarkMode
            ? "text-white/70 hover:text-white"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>목록으로</span>
      </button>

      {/* Post Header */}
      <article
        className={`rounded-2xl p-6 sm:p-8 mb-6 ${isDarkMode ? "glass-card" : "glass-card-light"}`}
      >
        <div className="mb-6">
          <Badge
            variant="secondary"
            className={
              isDarkMode
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/20 mb-4"
                : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300 mb-4"
            }
          >
            {post.category.categoryTitle}
          </Badge>

          <h1 className={isDarkMode ? "text-white mb-4" : "text-gray-900 mb-4"}>
            {post.title}
          </h1>

          <div
            className={`flex flex-wrap items-center gap-4 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              {/* <span>{post.readTime} 읽기</span> */}
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        {tocItems.length > 0 && (
          <div
            className={`border rounded-xl overflow-hidden ${
              isDarkMode
                ? "border-white/10 bg-white/5"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className={`w-full flex items-center justify-between px-6 py-4 transition-colors ${
                isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3">
                <List
                  className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
                />
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                  목차
                </span>
              </div>
              <motion.div
                animate={{ rotate: isTocOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className={`w-5 h-5 ${isDarkMode ? "text-white/60" : "text-gray-600"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isTocOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className={`px-6 pb-4 border-t ${isDarkMode ? "border-white/10" : "border-gray-200"}`}
                  >
                    <nav className="space-y-2 mt-4">
                      {tocItems.map((item, index) => (
                        <motion.button
                          key={item.id}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                            isDarkMode
                              ? "text-white/70 hover:bg-white/10 hover:text-white"
                              : "text-gray-600 hover:bg-white hover:text-gray-900"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span
                              className={
                                isDarkMode ? "text-blue-400" : "text-blue-600"
                              }
                            >
                              {index + 1}.
                            </span>
                            <span>{item.title}</span>
                          </div>
                        </motion.button>
                      ))}
                    </nav>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Post Content */}
        <div
          className={`mt-8 space-y-6 ${isDarkMode ? "text-white/80" : "text-gray-700"}`}
        >
          <EditerMarkdown
            source={post.contents}
            data-color-mode={isDarkMode ? "dark" : "light"}
            style={{ backgroundColor: "transparent" }}
          />
        </div>

        {/* Tags */}
        <PostTags post={post} />
      </article>

      {/* Comments Section */}
      <Comments comments={post.comments} />

      {/* Previous/Next Posts Navigation */}
      <PostNavigation />
    </div>
  );
};

export default PostDetail;
