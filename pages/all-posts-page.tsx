import {
  useGetCategories,
  useGetPopularHashTagList,
  useGetPostList,
} from "@/hooks/hooks";
import { useState } from "react";
import { useRouter } from "next/router";
import { ChevronDown, Search } from "lucide-react";
import Head from "next/head";
import { useUserInfoStore } from "@/stores/useUserInfoStore";
import BlogPostCard2 from "@/components/cards/blog-post-card2";
import { EditorialPageHeading } from "@/components/editorial/page-heading";

const AllPostsPage = () => {
  const { categories } = useGetCategories();
  const { userInfo } = useUserInfoStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set());
  const router = useRouter();
  const posts = useGetPostList();
  const popularHashTags = useGetPopularHashTagList();

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      (post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query)) &&
      (selectedCategory === "all" ||
        post.category?.categoryTitle === selectedCategory)
    );
  });

  const toggleParentCategory = (title: string) => {
    setExpandedParents((current) => {
      const next = new Set(current);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  };

  return (
    <>
      <Head>
        <title>모든 포스트 | {userInfo?.user?.nickname}&apos;s blog</title>
        <meta name="description" content={`총 ${posts.length}개의 기술 포스트를 읽어보세요.`} />
      </Head>
      <main className="editorial-inner-page">
        <EditorialPageHeading
          index="01"
          eyebrow="Archive / All notes"
          title="모든 포스트"
          description="기록은 시간순으로 쌓이고, 관심사는 주제별로 연결됩니다."
          meta={`${posts.length.toString().padStart(2, "0")} ARTICLES`}
        />

        <label className="editorial-search">
          <Search aria-hidden="true" />
          <span className="sr-only">포스트 검색</span>
          <input
            type="search"
            placeholder="제목이나 내용으로 검색"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <kbd>⌘ K</kbd>
        </label>

        <div className="editorial-archive-layout">
          <aside className="editorial-filter-panel">
            <span className="editorial-section-label">Filter by subject</span>
            <button
              className={selectedCategory === "all" ? "is-active" : ""}
              onClick={() => setSelectedCategory("all")}
            >
              <span>전체 포스트</span><small>{posts.length}</small>
            </button>
            {categories?.map((parent) => (
              <div className="editorial-filter-group" key={parent.categoryTitle}>
                <button
                  aria-expanded={expandedParents.has(parent.categoryTitle)}
                  onClick={() => toggleParentCategory(parent.categoryTitle)}
                >
                  <span>{parent.categoryTitle}</span>
                  <ChevronDown aria-hidden="true" />
                </button>
                {expandedParents.has(parent.categoryTitle) && (
                  <div>
                    {parent.subCategories?.map((category) => (
                      <button
                        key={category.categoryTitle}
                        className={selectedCategory === category.categoryTitle ? "is-active" : ""}
                        onClick={() => setSelectedCategory(category.categoryTitle)}
                      >
                        <span>{category.categoryTitle}</span><small>{category.post?.length || 0}</small>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="editorial-filter-tags">
              <span className="editorial-section-label">Popular tags</span>
              <p>{popularHashTags.slice(0, 10).map((tag) => `#${tag.hashtag}`).join("  ")}</p>
            </div>
          </aside>

          <section className="editorial-archive-results">
            <div className="editorial-list-heading">
              <h2>{selectedCategory === "all" ? "전체 기록" : selectedCategory}</h2>
              <span>{filteredPosts.length} RESULTS</span>
            </div>
            {filteredPosts.length ? filteredPosts.map((post) => (
              <BlogPostCard2
                key={post.id}
                post={post}
                mainYn={false}
                onClick={() => router.push(`/post/${post.category?.parentCategory?.categoryTitle}/${post.category?.categoryTitle}/@Post-${post.id}`)}
              />
            )) : (
              <div className="editorial-empty">검색 결과가 없습니다.<br /><small>다른 키워드나 주제를 선택해보세요.</small></div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default AllPostsPage;
