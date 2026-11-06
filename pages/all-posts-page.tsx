import { useGetCategories, useGetPopularHashTagList } from "@/hooks/hooks";
import {
  GetPaginatedPostListQuery,
  GetPaginatedPostListQueryVariables,
  PostCardFieldsFragment,
  GetCategoriesQuery,
} from "@/gql/graphql";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { createApolloClient } from "@/apollo";
import { getCategories } from "@/lib/posts";
import { useApolloClient } from "@apollo/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Head from "next/head";
import BlogPostCard2 from "@/components/cards/blog-post-card2";
import { EditorialPageHeading } from "@/components/editorial/page-heading";
import { CATEGORY_POST_PAGE_SIZE } from "@/common/constants";
import { GET_PAGINATED_POST_LIST_QUERY } from "@/lib/queries";

type AllPostsPageProps = {
  initialPosts: PostCardFieldsFragment[];
  initialTotalCount: number;
  initialHasMore: boolean;
  initialPage: number;
  initialCategories: NonNullable<GetCategoriesQuery["getCategories"]["categories"]>;
};

export const getServerSideProps: GetServerSideProps<AllPostsPageProps> = async ({ query }) => {
  const pageValue = query.page;
  if (
    pageValue !== undefined &&
    (typeof pageValue !== "string" || !/^[1-9]\d*$/.test(pageValue))
  ) {
    return { notFound: true };
  }

  const initialPage = Number(pageValue || 1);
  const offset = (initialPage - 1) * CATEGORY_POST_PAGE_SIZE;
  if (!Number.isSafeInteger(offset) || offset > 2147483647) {
    return { notFound: true };
  }

  const [{ data }, initialCategories] = await Promise.all([
    createApolloClient().query<GetPaginatedPostListQuery, GetPaginatedPostListQueryVariables>({
      query: GET_PAGINATED_POST_LIST_QUERY,
      variables: { offset, limit: CATEGORY_POST_PAGE_SIZE },
      fetchPolicy: "no-cache",
    }),
    getCategories(),
  ]);
  const page = data.getPaginatedPostList;
  if (!page.ok) throw new Error(page.error || "Unable to load posts");
  if (initialPage > 1 && !page.posts?.length) return { notFound: true };

  return {
    props: {
      initialPosts: page.posts || [],
      initialTotalCount: page.totalCount,
      initialHasMore: page.hasMore,
      initialPage,
      initialCategories,
    },
  };
};

const AllPostsPage = ({
  initialPosts,
  initialTotalCount,
  initialHasMore,
  initialPage,
  initialCategories,
}: AllPostsPageProps) => {
  const { categories: clientCategories } = useGetCategories();
  const categories = clientCategories.length ? clientCategories : initialCategories;
  const client = useApolloClient();
  const popularHashTags = useGetPopularHashTagList();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedParents, setExpandedParents] = useState<Set<string>>(
    new Set()
  );
  const [posts, setPosts] = useState(initialPosts);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const queryVersionRef = useRef(0);
  const isUnfiltered = !debouncedSearchQuery && selectedCategory === "all";
  const pageOffset = isUnfiltered ? (initialPage - 1) * CATEGORY_POST_PAGE_SIZE : 0;
  const nextPage = Math.ceil((pageOffset + posts.length) / CATEGORY_POST_PAGE_SIZE) + 1;

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
    if (isUnfiltered && reloadKey === 0) {
      setPosts(initialPosts);
      setTotalCount(initialTotalCount);
      setHasMore(initialHasMore);
      setIsLoading(false);
      setLoadError(false);
      loadingRef.current = false;
      return;
    }
    loadingRef.current = true;
    setIsLoading(true);
    setLoadError(false);
    setPosts([]);

    void queryPosts(pageOffset)
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
  }, [queryPosts, reloadKey, isUnfiltered, pageOffset, initialPosts, initialTotalCount, initialHasMore]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingRef.current) return;

    loadingRef.current = true;
    const queryVersion = queryVersionRef.current;
    setIsLoading(true);
    setLoadError(false);

    try {
      const page = await queryPosts(pageOffset + posts.length);
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
  }, [hasMore, pageOffset, posts.length, queryPosts]);

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
        <title>{`모든 글${initialPage > 1 ? ` · ${initialPage}페이지` : ""} | Librarian's Archive`}</title>
        <meta
          name="description"
          content="블로그에 올린 개발 글을 모아뒀어요. 제목이나 요약으로 검색할 수 있습니다."
        />
      </Head>
      <main className="editorial-inner-page">
        <EditorialPageHeading
          index="01"
          eyebrow="글 목록"
          title="모든 글"
          description="최근에 올린 글부터 볼 수 있어요."
          meta={`글 ${totalCount.toString().padStart(2, "0")}개`}
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
            <span className="editorial-section-label">카테고리</span>
            <button
              className={selectedCategory === "all" ? "is-active" : ""}
              onClick={() => setSelectedCategory("all")}
            >
              <span>모든 글</span>
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
              <span className="editorial-section-label">많이 쓴 태그</span>
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
                {selectedCategory === "all" ? "전체 목록" : selectedCategory}
              </h2>
              <span>{totalCount}개</span>
            </div>
            {posts.length
              ? posts.map((post) => (
                  <BlogPostCard2
                    key={post.id}
                    post={post}
                    mainYn={false}
                  />
                ))
              : !isLoading && (
                  <div className="editorial-empty">
                    검색 결과가 없습니다.
                    <br />
                    <small>검색어를 바꾸거나 다른 카테고리를 골라 보세요.</small>
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
            {isUnfiltered && (
              <nav aria-label="글 목록 페이지" className="mt-6 flex items-center justify-between gap-4">
                {initialPage > 1 ? (
                  <Link href={initialPage === 2 ? "/all-posts-page" : `/all-posts-page?page=${initialPage - 1}`} prefetch={false} rel="prev" className="editorial-back">
                    이전 페이지
                  </Link>
                ) : <span />}
                {hasMore && (
                  <Link href={`/all-posts-page?page=${nextPage}`} prefetch={false} rel="next" className="editorial-back">
                    다음 페이지
                  </Link>
                )}
              </nav>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default AllPostsPage;
