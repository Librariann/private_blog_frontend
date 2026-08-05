import { EditorialPageHeading } from "@/components/editorial/page-heading";
import { useGetCategories, useGetPopularHashTagList } from "@/hooks/hooks";
import { ArrowUpRight, Hash } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";

const AllCategoriesPage = () => {
  const router = useRouter();
  const { categories } = useGetCategories();
  const popularHashTags = useGetPopularHashTagList();
  const totalSubCategories = categories.reduce(
    (sum, category) => sum + (category.subCategories?.length || 0), 0
  );
  const totalPosts = categories.reduce(
    (sum, category) => sum + (category.subCategories?.reduce(
      (subtotal, child) => subtotal + (child.post?.length || 0), 0
    ) || 0), 0
  );

  return (
    <>
      <Head>
        <title>카테고리 | Librarian&apos;s Blog</title>
        <meta name="description" content={`${totalPosts}개의 포스트를 주제별로 탐색해보세요.`} />
      </Head>
      <main className="editorial-inner-page">
        <EditorialPageHeading
          index="02"
          eyebrow="Index / Subjects"
          title="관심사의 지도"
          description="문제와 도구, 시행착오가 서로 만나는 지점을 주제별로 정리했습니다."
          meta={`${categories.length} FIELDS / ${totalSubCategories} TOPICS`}
        />

        <dl className="editorial-stats">
          <div><dt>Fields</dt><dd>{categories.length.toString().padStart(2, "0")}</dd></div>
          <div><dt>Topics</dt><dd>{totalSubCategories.toString().padStart(2, "0")}</dd></div>
          <div><dt>Articles</dt><dd>{totalPosts.toString().padStart(2, "0")}</dd></div>
        </dl>

        <section className="editorial-category-index">
          {categories.map((parent, parentIndex) => {
            const parentPostCount = parent.subCategories?.reduce(
              (sum, child) => sum + (child.post?.length || 0), 0
            ) || 0;
            return (
              <article key={parent.categoryTitle} className="editorial-category-block">
                <header>
                  <span>{String(parentIndex + 1).padStart(2, "0")}</span>
                  <div className="editorial-category-icon">
                    <Hash aria-hidden="true" />
                  </div>
                  <div>
                    <h2>{parent.categoryTitle}</h2>
                    <p>{parent.subCategories?.length || 0} TOPICS · {parentPostCount} ARTICLES</p>
                  </div>
                </header>
                <div className="editorial-topic-grid">
                  {parent.subCategories?.map((child) => (
                    <button
                      key={child.categoryTitle}
                      onClick={() => router.push(`/post/${parent.categoryTitle}/${child.categoryTitle}`)}
                    >
                      <span>{child.categoryTitle}</span>
                      <small>{child.post?.length || 0} NOTES</small>
                      <ArrowUpRight aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </section>

        <section className="editorial-topic-cloud">
          <span className="editorial-section-label">Frequent vocabulary</span>
          <div>{popularHashTags.slice(0, 12).map((tag) => (
            <span key={tag.hashtag}>#{tag.hashtag}<sup>{tag.count}</sup></span>
          ))}</div>
        </section>
      </main>
    </>
  );
};

export default AllCategoriesPage;
