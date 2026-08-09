import { ArrowLeft } from "lucide-react";
import { Post } from "@/gql/graphql";
import { useRouter } from "next/router";
import { useFindOneCategoryById } from "@/hooks/hooks";
import { useMemo } from "react";
import BlogPostCard2 from "../cards/blog-post-card2";
import { EditorialPageHeading } from "../editorial/page-heading";

const CategoryDetails = ({ posts, categoryId }: { posts: Post[]; categoryId: number }) => {
  const router = useRouter();
  const { slug } = router.query;
  const category = useFindOneCategoryById({ categoryId });
  const categoryMemoized = useMemo(() => category, [category]);
  const tagCounts = new Map<string, number>();
  posts.flatMap((post) => post.hashtags).forEach((tag) => {
    if (tag?.hashtag) tagCounts.set(tag.hashtag, (tagCounts.get(tag.hashtag) || 0) + 1);
  });
  const tags = Array.from(tagCounts.entries()).sort((a, b) => b[1] - a[1]);
  const totalViews = posts.reduce((sum, post) => sum + post.hits, 0);
  const averageReadTime = posts.length
    ? Math.round(posts.reduce((sum, post) => sum + post.readTime, 0) / posts.length)
    : 0;

  return (
    <main className="editorial-inner-page">
      <button className="editorial-back" onClick={() => router.back()}>
        <ArrowLeft aria-hidden="true" /> 전체 카테고리
      </button>
      <EditorialPageHeading
        index="03"
        eyebrow="Subject / Collection"
        title={String(slug?.[1] || categoryMemoized?.categoryTitle || "카테고리")}
        description={categoryMemoized?.description || "이 주제에 관해 기록한 생각과 구현의 과정입니다."}
        meta={`${posts.length} ARTICLES`}
      />
      <dl className="editorial-stats">
        <div><dt>Articles</dt><dd>{posts.length.toString().padStart(2, "0")}</dd></div>
        <div><dt>Total views</dt><dd>{totalViews.toLocaleString()}</dd></div>
        <div><dt>Avg. read</dt><dd>{averageReadTime}′</dd></div>
      </dl>
      <section className="editorial-archive-results editorial-category-results">
        <div className="editorial-list-heading"><h2>이 주제의 기록</h2><span>NEWEST FIRST</span></div>
        {posts.length ? posts.map((post) => (
          <BlogPostCard2
            key={post.id}
            post={post}
            mainYn={false}
            onClick={() => router.push(`/post/${post.category?.parentCategory?.categoryTitle}/${post.category?.categoryTitle}/@Post-${post.id}`)}
          />
        )) : <div className="editorial-empty">아직 포스트가 없습니다.</div>}
      </section>
      {tags.length > 0 && (
        <section className="editorial-topic-cloud">
          <span className="editorial-section-label">Vocabulary in this subject</span>
          <div>{tags.slice(0, 10).map(([tag, count]) => <span key={tag}>#{tag}<sup>{count}</sup></span>)}</div>
        </section>
      )}
    </main>
  );
};

export default CategoryDetails;
