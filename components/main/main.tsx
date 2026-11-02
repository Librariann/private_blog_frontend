import React, { startTransition, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CornerDownRight,
} from "lucide-react";
import { popularHashTagsProps } from "@/pages";
import { Post } from "@/gql/graphql";
import Link from "next/link";
import { useGetCategories } from "@/hooks/hooks";
import styled from "styled-components";
import Head from "next/head";
import { useUserInfoStore } from "@/stores/useUserInfoStore";
import { formatDateShort } from "@/utils/utils";
import { glassCardTypes } from "../cards/blog-post-card";

const getPostPath = (post?: Post) => {
  if (!post?.id) return "/all-posts-page";

  return `/post/${encodeURIComponent(post.category?.parentCategory?.categoryTitle || "")}/${encodeURIComponent(post.category?.categoryTitle || "")}/@Post-${post.id}`;
};

const Main = ({
  posts,
  popularHashTags,
  featuredPost,
}: {
  posts: Post[];
  popularHashTags: popularHashTagsProps[];
  featuredPost: Post;
}) => {
  const { userInfo } = useUserInfoStore();
  const [isClientReady, setIsClientReady] = useState(false);
  const { categories, categoriesLoading } = useGetCategories(!isClientReady);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    startTransition(() => setIsClientReady(true));
  }, []);

  useEffect(() => {
    if (!categoriesLoading && categories[0]?.categoryTitle) {
      startTransition(() => {
        setExpandedCategories(new Set([categories[0].categoryTitle]));
      });
    }
  }, [categories, categoriesLoading]);

  const primaryPost = useMemo(() => {
    if (!featuredPost?.id) return posts[0];

    const completePost = posts.find((post) => post.id === featuredPost.id);
    return completePost ? { ...completePost, ...featuredPost } : featuredPost;
  }, [featuredPost, posts]);
  const latestPosts = useMemo(
    () => posts.filter((post) => post.id !== primaryPost?.id).slice(0, 4),
    [posts, primaryPost?.id]
  );
  const indexedPosts = posts.slice(0, 6);
  const issueNumber = primaryPost?.createdAt
    ? String(new Date(primaryPost.createdAt).getMonth() + 1).padStart(2, "0")
    : "01";

  const toggleCategory = (title: string) => {
    setExpandedCategories((current) => {
      const next = new Set(current);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  };

  return (
    <>
      <Head>
        <title>{`${userInfo?.user?.nickname || "Librarian"}'s Archive | 개발 블로그`}</title>
        <meta
          name="description"
          content="개발하면서 막혔던 것, 직접 해보고 알게 된 것들을 적는 블로그입니다."
        />
        <meta property="og:title" content="Librarian's Archive" />
        <meta
          property="og:description"
          content={`백엔드, 프론트엔드, 인프라 이야기 · 글 ${posts.length}개`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://librarian-blog.dev" />
        <meta property="og:image" content={primaryPost?.thumbnailUrl ?? ""} />
      </Head>

      <main className="editorial-page">
        <div className="editorial-registration editorial-registration-top" aria-hidden="true" />
        <div className="editorial-registration editorial-registration-bottom" aria-hidden="true" />

        <section className="editorial-hero" aria-labelledby="featured-post-title">
          <aside className="editorial-margin-note" aria-hidden="true">
            <span>A</span>
            <span>{issueNumber}</span>
            <i />
            <p>
              <span>NO COFFEE.</span>
              <span>NO CODE.</span>
              <span>JUST ONE</span>
              <span>MORE COMMIT.</span>
            </p>
          </aside>

          <article className="editorial-featured">
            <div className="editorial-issue">
              <span>ISSUE</span>
              <strong>{issueNumber}</strong>
            </div>

            <p className="editorial-eyebrow">
              {primaryPost?.category?.categoryTitle || "개발 블로그"}
              <span aria-hidden="true">/</span>
              추천 글
            </p>
            <h1 id="featured-post-title" className="editorial-display">
              {primaryPost?.title || "개발하면서 배운 것들"}
            </h1>
            <div className="editorial-proof-line" aria-hidden="true" />
            <p className="editorial-deck">
              {primaryPost?.excerpt ||
                "개발하다 막힌 문제와 어떻게 풀었는지 적어둡니다."}
            </p>
            <div className="editorial-meta">
              <span>{primaryPost?.category?.categoryTitle || "NOTE"}</span>
              <span>{primaryPost?.readTime || 0} MIN</span>
              <span>
                {primaryPost?.createdAt
                  ? formatDateShort(primaryPost.createdAt)
                  : "RECENT"}
              </span>
            </div>
            <Link
              href={getPostPath(primaryPost)}
              className="editorial-read-link"
            >
              글 읽기 <ArrowUpRight aria-hidden="true" />
            </Link>
          </article>

          <aside className="editorial-latest" aria-labelledby="latest-notes-title">
            <div className="editorial-section-heading">
              <h2 id="latest-notes-title">최근 글</h2>
            </div>

            <div className="editorial-latest-list">
              {latestPosts.length > 0 ? (
                latestPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={getPostPath(post)}
                    className="editorial-latest-row"
                  >
                    <span className="editorial-index-circle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="editorial-latest-copy">
                      <span className="editorial-latest-meta">
                        {post.category?.categoryTitle || "NOTE"} · {post.readTime} MIN
                      </span>
                      <strong>{post.title}</strong>
                    </span>
                    <span className="editorial-latest-date">
                      {formatDateShort(post.createdAt)}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="editorial-empty">
                  아직 올라온 글이 없어요.
                </p>
              )}
            </div>
          </aside>
        </section>

        <section className="editorial-index-section" aria-labelledby="archive-index-title">
          <div className="editorial-index-header">
            <div>
              <span>ARCHIVE / {String(posts.length).padStart(3, "0")}</span>
              <h2 id="archive-index-title">개발 글 모음</h2>
            </div>
            <Link href="/all-posts-page">
              모든 글 보기 <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="editorial-table">
            <div className="editorial-table-head" aria-hidden="true">
              <span>NO.</span>
              <span>CATEGORY</span>
              <span>DATE</span>
              <span>TITLE / ABSTRACT</span>
              <span>READ</span>
            </div>
            {indexedPosts.map((post, index) => (
              <Link
                key={post.id}
                href={getPostPath(post)}
                className="editorial-table-row"
              >
                <span className="editorial-row-number">
                  {String(index + 1).padStart(3, "0")}
                </span>
                <span className="editorial-row-category">
                  {post.category?.categoryTitle || "NOTE"}
                </span>
                <span className="editorial-row-date">
                  {formatDateShort(post.createdAt)}
                </span>
                <span className="editorial-row-copy">
                  <strong>{post.title}</strong>
                  <small>{post.excerpt}</small>
                </span>
                <ArrowUpRight className="editorial-row-arrow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="editorial-discovery" aria-label="주제별 탐색">
          <div className="editorial-discovery-intro">
            <span>카테고리</span>
            <h2>
              <span>관심 있는 주제부터</span>
              <span>골라 보세요.</span>
            </h2>
            <p>
              어디서 막혔고 어떻게 풀었는지, 주제별로 모아뒀어요.
            </p>
          </div>

          <div className="editorial-categories">
            {categories.map((parent) => {
              const isExpanded = expandedCategories.has(parent.categoryTitle);

              return (
                <div className="editorial-category" key={parent.categoryTitle}>
                  <button
                    type="button"
                    onClick={() => toggleCategory(parent.categoryTitle)}
                    aria-expanded={isExpanded}
                  >
                    <span>{parent.categoryTitle}</span>
                    <span className="editorial-category-count">
                      {String(parent.postCount ?? 0).padStart(2, "0")}
                      <ChevronDown aria-hidden="true" />
                    </span>
                  </button>
                  <div className={`editorial-subcategory-reveal ${isExpanded ? "is-open" : ""}`}>
                    <div>
                      {parent.subCategories?.map((sub) => (
                        <Link
                          key={sub.categoryTitle}
                          href={`/post/${encodeURIComponent(parent.categoryTitle)}/${encodeURIComponent(sub.categoryTitle)}`}
                        >
                          <CornerDownRight aria-hidden="true" />
                          {sub.categoryTitle}
                          <span>{sub.postCount ?? 0}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="editorial-tags">
            <span>많이 쓴 태그</span>
            <div>
              {popularHashTags?.slice(0, 8).map((tag) => (
                <span key={tag.hashtag}>#{tag.hashtag}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="editorial-author" aria-label="작성자 소개">
          <span className="editorial-author-mark" aria-hidden="true">✳</span>
          <div>
            <span>블로그 주인</span>
            <strong>{userInfo?.user?.nickname || "Park SeongHyun"}</strong>
            <small>{userInfo?.user?.role || "Software Engineer"}</small>
          </div>
          <p>{userInfo?.user?.introduce}</p>
          <Link href="/about">
            프로필 보기 <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </main>
    </>
  );
};

export const GlassCardMain = styled.div<glassCardTypes>`
  background: ${(props) =>
    props.$isDarkMode
      ? "rgba(24, 24, 21, 0.92)"
      : "rgba(244, 240, 232, 0.94)"};
  border: 1px solid
    ${(props) =>
      props.$isDarkMode ? "rgba(239, 234, 222, 0.18)" : "rgba(23, 24, 21, 0.16)"};
  box-shadow: none;
`;

export const MemoizedMain = React.memo(Main);
