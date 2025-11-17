import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Post } from "@/gql/graphql";
import { useDarkModeStore } from "@/stores/useDarkmodStore";

type BlogPostCardProps = {
  post: Post;
  onClick?: () => void;
};

export function BlogPostCard({ post, onClick }: BlogPostCardProps) {
  const { isDarkMode } = useDarkModeStore();

  return (
    <article
      onClick={onClick}
      className={`group rounded-xl p-6 cursor-pointer transition-all duration-300 border ${
        isDarkMode
          ? "glass-card-hover border-white/10 hover:border-white/30"
          : "glass-card-light-hover border-gray-200 hover:border-blue-300"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <Badge
          variant="secondary"
          className={
            isDarkMode
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/20"
              : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300"
          }
        >
          {post.category.categoryTitle}
        </Badge>
        <div
          className={`flex items-center space-x-4 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
        >
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(post.createdAt).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}분</span>
          </div>
        </div>
      </div>

      <h3
        className={`mb-2 transition-colors ${
          isDarkMode
            ? "text-white group-hover:text-blue-300"
            : "text-gray-900 group-hover:text-blue-600"
        }`}
      >
        {post.title}
      </h3>

      <p className={isDarkMode ? "text-white/70 mb-4" : "text-gray-600 mb-4"}>
        {post.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {post.hashtags.map((tag) => (
            <span
              key={tag.hashtag}
              className={`px-2 py-1 backdrop-blur-sm rounded border ${
                isDarkMode
                  ? "bg-white/5 text-white/80 border-white/10"
                  : "bg-gray-50 text-gray-700 border-gray-200"
              }`}
            >
              #{tag.hashtag}
            </span>
          ))}
        </div>
        <div
          className={`flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity ${
            isDarkMode ? "text-blue-300" : "text-blue-600"
          }`}
        >
          <span>더 읽기</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  );
}
