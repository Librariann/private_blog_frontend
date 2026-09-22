import { useGetCategories, useGetPopularHashTagList } from "@/hooks/hooks";
import {
  GetPaginatedPostListQuery,
  GetPaginatedPostListQueryVariables,
  PostCardFieldsFragment,
} from "@/gql/graphql";
import { useApolloClient } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ChevronDown, Search } from "lucide-react";
import Head from "next/head";
import { useUserInfoStore } from "@/stores/useUserInfoStore";
import BlogPostCard2 from "@/components/cards/blog-post-card2";
import { EditorialPageHeading } from "@/components/editorial/page-heading";
import { CATEGORY_POST_PAGE_SIZE } from "@/common/constants";
import { GET_PAGINATED_POST_LIST_QUERY } from "@/lib/queries";

const AllPostsPage = () => {
  const { categories } = useGetCategories();
  const { userInfo } = useUserInfoStore();
  const client = useApolloClient();
  const router = useRouter();
  const popularHashTags = useGetPopularHashTagList();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedParents, setExpandedParents] = useState<Set<string>>(
    new Set()
  );
  const [posts, setPosts] = useState<PostCardFieldsFragment[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const queryVersionRef = useRef(0);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedSearchQuery(searchQuery.trim()),
      300
    );
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  const queryPosts = useCallback(
    async (offset: number) => {
      const { data } = await client.query<
        GetPaginatedPostListQuery,
        GetPaginatedPostListQueryVariables
      >({
        query: GET_PAGINATED_POST_LIST_QUERY,
        variables: {
          offset,
          limit: CATEGORY_POST_PAGE_SIZE,
          searchQuery: debouncedSearchQuery || null,
          categoryTitle: selectedCategory === "all" ? null : selectedCategory,
        },
        fetchPolicy: "no-cache",
      });

      const page = data.getPaginatedPostList;
      if (!page?.ok) throw new Error(page?.error || "포스트 조회 실패");
      return page;
    },
    [client, debouncedSearchQuery, selectedCategory]
  );

  useEffect(() => {
    let active = true;
    const queryVersion = ++queryVersionRef.current;
    loadingRef.current = true;
    setIsLoading(true);
    setLoadError(false);
    setPosts([]);

    void queryPosts(0)
      .then((page) => {
        if (!active || queryVersion !== queryVersionRef.current) return;
        setPosts(page?.posts || []);
        setTotalCount(page?.totalCount || 0);
        setHasMore(page?.hasMore || false);
      })
      .catch(() => {
        if (!active || queryVersion !== queryVersionRef.current) return;
        setLoadError(true);
        setTotalCount(0);
        setHasMore(false);
      })
      .finally(() => {
        if (!active || queryVersion !== queryVersionRef.current) return;
        loadingRef.current = false;
        setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [queryPosts, reloadKey]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingRef.current) return;

    loadingRef.current = true;
    const queryVersion = queryVersionRef.current;
    setIsLoading(true);
    setLoadError(false);

    try {
      const page = await queryPosts(posts.length);
      if (queryVersion !== queryVersionRef.current) return;
      const nextPosts = page?.posts || [];

      setPosts((currentPosts) => {
        const loadedIds = new Set(currentPosts.map((post) => post.id));
        return [
          ...currentPosts,
          ...nextPosts.filter((post) => !loadedIds.has(post.id)),
        ];
      });
      setHasMore(page?.hasMore || false);
      setTotalCount(page?.totalCount || 0);
    } catch (error) {
      if (queryVersion !== queryVersionRef.current) return;
      setLoadError(true);
    } finally {
      if (queryVersion !== queryVersionRef.current) return;
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [hasMore, posts.length, queryPosts]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || loadError) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void loadMore();
      },
      { rootMargin: "320px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadError, loadMore]);

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
        <meta
          name="description"
          content={`총 ${totalCount}개의 기술 포스트를 읽어보세요.`}
        />
      </Head>
      <main className="editorial-inner-page">
        <EditorialPageHeading
          index="01"
          eyebrow="Archive / All notes"
          title="모든 포스트"
          description="기록은 시간순으로 쌓이고, 관심사는 주제별로 연결됩니다."
          meta={`${totalCount.toString().padStart(2, "0")} ARTICLES`}
        />

        <label className="editorial-search">
          <Search aria-hidden="true" />
          <span className="sr-only">포스트 검색</span>
          <input
            type="search"
            placeholder="제목이나 요약으로 검색"
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
              <span>전체 포스트</span>
              <small>{selectedCategory === "all" ? totalCount : "ALL"}</small>
            </button>
            {categories?.map((parent) => (
              <div
                className="editorial-filter-group"
                key={parent.categoryTitle}
              >
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
                        className={
                          selectedCategory === category.categoryTitle
                            ? "is-active"
                            : ""
                        }
                        onClick={() =>
                          setSelectedCategory(category.categoryTitle)
                        }
                      >
                        <span>{category.categoryTitle}</span>
                        <small>{category.postCount ?? 0}</small>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="editorial-filter-tags">
              <span className="editorial-section-label">Popular tags</span>
              <p>
                {popularHashTags
                  .slice(0, 10)
                  .map((tag) => `#${tag.hashtag}`)
                  .join("  ")}
              </p>
            </div>
          </aside>

          <section className="editorial-archive-results">
            <div className="editorial-list-heading">
              <h2>
                {selectedCategory === "all" ? "전체 기록" : selectedCategory}
              </h2>
              <span>{totalCount} RESULTS</span>
            </div>
            {posts.length
              ? posts.map((post) => (
                  <BlogPostCard2
                    key={post.id}
                    post={post}
                    mainYn={false}
                    onClick={() =>
                      router.push(
                        `/post/${post.category?.parentCategory?.categoryTitle}/${post.category?.categoryTitle}/@Post-${post.id}`
                      )
                    }
                  />
                ))
              : !isLoading && (
                  <div className="editorial-empty">
                    검색 결과가 없습니다.
                    <br />
                    <small>다른 키워드나 주제를 선택해보세요.</small>
                  </div>
                )}
            <div ref={sentinelRef} className="editorial-infinite-status">
              {isLoading && <span role="status">다음 글을 불러오는 중...</span>}
              {loadError && (
                <button
                  type="button"
                  onClick={() =>
                    posts.length
                      ? void loadMore()
                      : setReloadKey((current) => current + 1)
                  }
                >
                  불러오지 못했습니다. 다시 시도
                </button>
              )}
              {!hasMore && posts.length > CATEGORY_POST_PAGE_SIZE && (
                <span>모든 글을 불러왔습니다.</span>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default AllPostsPage;
