import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { ArrowLeft, Code2 } from "lucide-react";
import { BlogPostCard } from "../cards/blog-post-card";
import { Post } from "@/gql/graphql";
import { useRouter } from "next/router";

const CategoryDetails = ({ posts }: { posts: Post[] }) => {
  const { isDarkMode } = useDarkModeStore();
  const hashtagMaps = new Map<string, number>();
  const router = useRouter();
  const { slug } = router.query;

  posts
    .flatMap((post) => post.hashtags)
    .forEach((tag) => {
      const count = hashtagMaps.get(tag.hashtag) || 0;
      hashtagMaps.set(tag.hashtag, count + 1);
    });

  const postHashTags = Array.from(hashtagMaps.entries())
    .map(([hashtag, count]) => ({
      hashtag,
      count,
    }))
    .sort((a, b) => b.count - a.count);

  const postTotalViews = posts.reduce((acc, post) => acc + post.hits, 0);
  const avgReadTime = Math.round(
    posts.reduce((acc, post) => acc + post.readTime, 0) / posts.length
  );

  const Icon = Code2;
  const color = "from-blue-500 to-cyan-500";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        className={`flex items-center space-x-2 mb-6 transition-colors ${
          isDarkMode
            ? "text-white/70 hover:text-white"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>홈으로</span>
      </button>

      {/* Category Header */}
      <div
        className={`rounded-2xl p-8 mb-8 ${isDarkMode ? "glass-card" : "glass-card-light"}`}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center`}
          >
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1
              className={isDarkMode ? "text-white mb-2" : "text-gray-900 mb-2"}
            >
              {slug?.[1]}
            </h1>
            <p className={isDarkMode ? "text-white/60" : "text-gray-500"}>
              {posts.length}개의 포스트
            </p>
          </div>
        </div>
        <p className={isDarkMode ? "text-white/70" : "text-gray-600"}>
          {slug?.[1]} 개발과 관련된 최신 기술 트렌드, 팁, 그리고 실무 경험을
          공유합니다.
        </p>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div
          className={`rounded-xl p-6 ${isDarkMode ? "glass-card" : "glass-card-light"}`}
        >
          <div
            className={`mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            총 포스트
          </div>
          <div className={isDarkMode ? "text-white" : "text-gray-900"}>
            {posts.length}개
          </div>
        </div>
        <div
          className={`rounded-xl p-6 ${isDarkMode ? "glass-card" : "glass-card-light"}`}
        >
          <div
            className={`mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            총 조회수
          </div>
          <div className={isDarkMode ? "text-white" : "text-gray-900"}>
            {postTotalViews.toLocaleString()}
          </div>
        </div>
        <div
          className={`rounded-xl p-6 ${isDarkMode ? "glass-card" : "glass-card-light"}`}
        >
          <div
            className={`mb-2 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            평균 읽기 시간
          </div>
          <div className={isDarkMode ? "text-white" : "text-gray-900"}>
            {avgReadTime}분
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div
        className={`rounded-2xl p-6 ${isDarkMode ? "glass-card" : "glass-card-light"}`}
      >
        <h2 className={isDarkMode ? "text-white mb-6" : "text-gray-900 mb-6"}>
          모든 포스트
        </h2>

        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id}>
                <BlogPostCard
                  post={post}
                  onClick={() =>
                    router.push(`${router.asPath}/@Post-${post.id}`)
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`text-center py-12 ${isDarkMode ? "text-white/60" : "text-gray-500"}`}
          >
            <p>아직 포스트가 없습니다.</p>
          </div>
        )}
      </div>

      {/* Popular Tags in Category */}
      <div
        className={`rounded-2xl p-6 mt-6 ${isDarkMode ? "glass-card" : "glass-card-light"}`}
      >
        <h3 className={isDarkMode ? "text-white mb-4" : "text-gray-900 mb-4"}>
          인기 태그
        </h3>
        <div className="flex flex-wrap gap-2">
          {postHashTags.slice(0, 10).map((tag) => (
            <span
              key={tag.hashtag}
              className={`px-3 py-1 backdrop-blur-sm rounded-full border transition-all cursor-pointer ${
                isDarkMode
                  ? "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              }`}
            >
              #{tag.hashtag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
