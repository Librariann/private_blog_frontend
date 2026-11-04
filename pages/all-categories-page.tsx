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
    (sum, category) => sum + (category.postCount ?? 0), 0
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
          eyebrow="주제별 보기"
          title="카테고리"
          description="그동안 쓴 글을 주제별로 모아뒀어요."
          meta={`카테고리 ${categories.length}개 · 세부 주제 ${totalSubCategories}개`}
        />

        <dl className="editorial-stats">
          <div><dt>카테고리</dt><dd>{categories.length.toString().padStart(2, "0")}</dd></div>
          <div><dt>세부 주제</dt><dd>{totalSubCategories.toString().padStart(2, "0")}</dd></div>
          <div><dt>글</dt><dd>{totalPosts.toString().padStart(2, "0")}</dd></div>
        </dl>

        <section className="editorial-category-index">
          {categories.map((parent, parentIndex) => {
            return (
              <article key={parent.categoryTitle} className="editorial-category-block">
                <header>
                  <span>{String(parentIndex + 1).padStart(2, "0")}</span>
                  <div className="editorial-category-icon">
                    <Hash aria-hidden="true" />
                  </div>
                  <div>
                    <h2>{parent.categoryTitle}</h2>
                    <p>세부 주제 {parent.subCategories?.length || 0}개 · 글 {parent.postCount ?? 0}개</p>
                  </div>
                </header>
                <div className="editorial-topic-grid">
                  {parent.subCategories?.map((child) => (
                    <button
                      key={child.categoryTitle}
                      onClick={() => router.push(`/post/${parent.categoryTitle}/${child.categoryTitle}`)}
                    >
                      <span>{child.categoryTitle}</span>
                      <small>글 {child.postCount ?? 0}개</small>
                      <ArrowUpRight aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </section>

        <section className="editorial-topic-cloud">
          <span className="editorial-section-label">많이 쓴 태그</span>
          <div>{popularHashTags.slice(0, 12).map((tag) => (
            <span key={tag.hashtag}>#{tag.hashtag}<sup>{tag.count}</sup></span>
          ))}</div>
        </section>
      </main>
    </>
  );
};

export default AllCategoriesPage;
