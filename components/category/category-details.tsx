import { useApolloClient } from "@apollo/client";
import { ArrowLeft } from "lucide-react";
import { CATEGORY_POST_PAGE_SIZE } from "@/common/constants";
import { Post } from "@/gql/graphql";
import { useRouter } from "next/router";
import { useFindOneCategoryById } from "@/hooks/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GET_POST_BY_CATEGORYID_QUERY,
  GET_POST_BY_PARENT_CATEGORY_ID_QUERY,
} from "@/lib/queries";
import BlogPostCard2 from "../cards/blog-post-card2";
import { EditorialPageHeading } from "../editorial/page-heading";

type CategoryDetailsProps = {
  posts: Post[];
  categoryId: number;
  initialHasMore: boolean;
  totalCount: number;
  totalViews: number;
  averageReadTime: number;
  isParentCategory: boolean;
};

type CategoryPostPage = {
  posts?: Post[] | null;
  hasMore: boolean;
};

type CategoryPostQueryData = {
  getPostListByCategoryId?: CategoryPostPage | null;
  getPostsByParentCategoryId?: CategoryPostPage | null;
};

const CategoryDetails = ({
  posts,
  categoryId,
  initialHasMore,
  totalCount,
  totalViews,
  averageReadTime,
  isParentCategory,
}: CategoryDetailsProps) => {
  const router = useRouter();
  const client = useApolloClient();
  const { slug } = router.query;
  const category = useFindOneCategoryById({ categoryId });
  const categoryMemoized = useMemo(() => category, [category]);
  const [visiblePosts, setVisiblePosts] = useState(posts);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    setVisiblePosts(posts);
    setHasMore(initialHasMore);
    setLoadError(false);
    loadingRef.current = false;
  }, [categoryId, initialHasMore, posts]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingRef.current) return;

    loadingRef.current = true;
    setIsLoading(true);
    setLoadError(false);

    try {
      const { data } = await client.query<CategoryPostQueryData>({
        query: isParentCategory
          ? GET_POST_BY_PARENT_CATEGORY_ID_QUERY
          : GET_POST_BY_CATEGORYID_QUERY,
        variables: {
          categoryId,
          offset: visiblePosts.length,
          limit: CATEGORY_POST_PAGE_SIZE,
        },
        fetchPolicy: "no-cache",
      });
      const page = isParentCategory
        ? data.getPostsByParentCategoryId
        : data.getPostListByCategoryId;
      const nextPosts = page?.posts || [];

      setVisiblePosts((currentPosts) => {
        const loadedIds = new Set(currentPosts.map((post) => post.id));
        return [
          ...currentPosts,
          ...nextPosts.filter((post) => !loadedIds.has(post.id)),
        ];
      });
      setHasMore(page?.hasMore || false);
    } catch (error) {
      setLoadError(true);
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [categoryId, client, hasMore, isParentCategory, visiblePosts.length]);

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

  const tagCounts = new Map<string, number>();
  visiblePosts
    .flatMap((post) => post.hashtags)
    .forEach((tag) => {
      if (tag?.hashtag)
        tagCounts.set(tag.hashtag, (tagCounts.get(tag.hashtag) || 0) + 1);
    });
  const tags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <main className="editorial-inner-page">
      <button className="editorial-back" onClick={() => router.back()}>
        <ArrowLeft aria-hidden="true" /> 전체 카테고리
      </button>
      <EditorialPageHeading
        index="03"
        eyebrow="Subject / Collection"
        title={String(
          slug?.[1] || categoryMemoized?.categoryTitle || "카테고리"
        )}
        description={
          categoryMemoized?.description ||
          "이 주제에 관해 기록한 생각과 구현의 과정입니다."
        }
        meta={`${totalCount} ARTICLES`}
      />
      <dl className="editorial-stats">
        <div>
          <dt>Articles</dt>
          <dd>{totalCount.toString().padStart(2, "0")}</dd>
        </div>
        <div>
          <dt>Total views</dt>
          <dd>{totalViews.toLocaleString()}</dd>
        </div>
        <div>
          <dt>Avg. read</dt>
          <dd>{averageReadTime}′</dd>
        </div>
      </dl>
      <section className="editorial-archive-results editorial-category-results">
        <div className="editorial-list-heading">
          <h2>이 주제의 기록</h2>
          <span>NEWEST FIRST</span>
        </div>
        {visiblePosts.length ? (
          visiblePosts.map((post) => (
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
        ) : (
          <div className="editorial-empty">아직 포스트가 없습니다.</div>
        )}
        <div ref={sentinelRef} className="editorial-infinite-status">
          {isLoading && <span role="status">다음 글을 불러오는 중...</span>}
          {loadError && (
            <button type="button" onClick={() => void loadMore()}>
              불러오지 못했습니다. 다시 시도
            </button>
          )}
          {!hasMore && visiblePosts.length > CATEGORY_POST_PAGE_SIZE && (
            <span>모든 글을 불러왔습니다.</span>
          )}
        </div>
      </section>
      {tags.length > 0 && (
        <section className="editorial-topic-cloud">
          <span className="editorial-section-label">
            Vocabulary in this subject
          </span>
          <div>
            {tags.slice(0, 10).map(([tag, count]) => (
              <span key={tag}>
                #{tag}
                <sup>{count}</sup>
              </span>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default CategoryDetails;
