import { GetPostByIdQuery, Post } from "@/gql/graphql";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { formatDateShort } from "@/utils/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

type navationType = Pick<
  Post,
  "id" | "title" | "createdAt" | "readTime"
> | null;

export type PostNavigationProps = {
  post: {
    id: number;
    title: string;
    createdAt?: any;
    readTime: number;
    category?: {
      id: number;
      categoryTitle: string;
      parentCategory?: {
        categoryTitle: string;
      } | null;
    } | null;
  };
  prevPost: navationType;
  nextPost: navationType;
};

const PostNavigation = ({ post, prevPost, nextPost }: PostNavigationProps) => {
  const postBasePath = `/post/${post.category?.parentCategory?.categoryTitle}/${post.category?.categoryTitle}`;
  const { isDarkMode } = useDarkModeStore();
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {prevPost ? (
        <button
          onClick={() => router.push(`${postBasePath}/@Post-${prevPost.id}`)}
          className={`rounded-2xl p-6 text-left transition-all cursor-pointer ${
            isDarkMode
              ? "glass-card-hover border border-white/10 hover:border-white/30"
              : "glass-card-light-hover border border-gray-200 hover:border-blue-300"
          }`}
        >
          <div
            className={`flex items-center space-x-2 mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>이전글</span>
          </div>
          <h4 className={isDarkMode ? "text-white" : "text-gray-900"}>
            {prevPost.title}
          </h4>
          <p
            className={`mt-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            {formatDateShort(prevPost?.createdAt)} • {nextPost?.readTime}분
          </p>
        </button>
      ) : (
        <div
          className={`rounded-2xl p-6 ${
            isDarkMode
              ? "bg-white/5 border border-white/10"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <div className={isDarkMode ? "text-white/40" : "text-gray-400"}>
            이전글이 없습니다
          </div>
        </div>
      )}

      {nextPost ? (
        <button
          onClick={() => router.push(`${postBasePath}/@Post-${nextPost.id}`)}
          className={`rounded-2xl p-6 text-right transition-all cursor-pointer ${
            isDarkMode
              ? "glass-card-hover border border-white/10 hover:border-white/30"
              : "glass-card-light-hover border border-gray-200 hover:border-blue-300"
          }`}
        >
          <div
            className={`flex items-center justify-end space-x-2 mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            <span>다음글</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <h4 className={isDarkMode ? "text-white" : "text-gray-900"}>
            {nextPost?.title}
          </h4>
          <p
            className={`mt-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            {formatDateShort(nextPost?.createdAt)} • {nextPost?.readTime}분
          </p>
        </button>
      ) : (
        <div
          className={`rounded-2xl p-6 text-right ${
            isDarkMode
              ? "bg-white/5 border border-white/10"
              : "bg-gray-50 border border-gray-200"
          }`}
        >
          <div className={isDarkMode ? "text-white/40" : "text-gray-400"}>
            다음글이 없습니다
          </div>
        </div>
      )}
    </div>
  );
};

export default PostNavigation;
