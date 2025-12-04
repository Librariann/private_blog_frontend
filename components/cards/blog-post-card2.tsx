import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { GlassCardMotionMain } from "../main/main";
import { BlogPostCardProps } from "./blog-post-card";
import { Badge } from "../ui/badge";
import { formatDateShort, formatNumberConvertK } from "@/utils/utils";
import { Eye, View } from "lucide-react";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const BlogPostCard2 = ({ post, onClick, index }: BlogPostCardProps) => {
  const { isDarkMode } = useDarkModeStore();

  const daysAgo = differenceInDays(new Date(), new Date(post.createdAt));
  return (
    <GlassCardMotionMain
      $isDarkMode={isDarkMode}
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 * 0.05 }}
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300`}
    >
      <div className="flex gap-4 p-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge
              variant="secondary"
              className={
                isDarkMode
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-white/20"
                  : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300"
              }
            >
              {post.category?.categoryTitle}
            </Badge>
            <span
              className={`text-sm ${isDarkMode ? "text-white/40" : "text-gray-400"}`}
            >
              •
            </span>
            <span
              className={`text-sm ${isDarkMode ? "text-white/50" : "text-gray-500"}`}
            >
              {daysAgo > 7
                ? new Date(post.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                    locale: ko,
                  })}
            </span>
          </div>

          <h3
            className={`mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {post.title}
          </h3>

          <p
            className={`text-sm mb-3 line-clamp-2 ${
              isDarkMode ? "text-white/60" : "text-gray-600"
            }`}
          >
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            {post.hashtags?.map((tag, index) => (
              <Badge
                key={String(index)}
                variant="secondary"
                className={`text-xs ${
                  isDarkMode
                    ? "bg-white/5 text-white/70 border-white/10"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                #{tag.hashtag}
              </Badge>
            ))}
          </div>

          <div
            className={`flex items-center gap-4 mt-4 text-sm ${
              isDarkMode ? "text-white/50" : "text-gray-500"
            }`}
          >
            <span className="flex items-center gap-1">
              <Eye />
              {formatNumberConvertK(post.hits)}
            </span>
            {/* <span className="flex items-center gap-1">
              ❤️ {formatNumber(post.likes)}
            </span> */}
            <span>{post.readTime}분 읽기</span>
          </div>
        </div>

        {post.thumbnailUrl && (
          <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 hidden sm:block">
            <img
              src={post.thumbnailUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </div>
    </GlassCardMotionMain>
  );
};

export default BlogPostCard2;
