import React, { startTransition, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CornerDownRight,
} from "lucide-react";
import { popularHashTagsProps } from "@/pages";
import { Post } from "@/gql/graphql";
import { useRouter } from "next/router";
import { useGetCategories } from "@/hooks/hooks";
import styled from "styled-components";
import Head from "next/head";
import { useUserInfoStore } from "@/stores/useUserInfoStore";
import { formatDateShort } from "@/utils/utils";
import { glassCardTypes } from "../cards/blog-post-card";

const getPostPath = (post?: Post) => {
  if (!post?.id) return "/all-posts-page";

  return `/post/${post.category?.parentCategory?.categoryTitle}/${post.category?.categoryTitle}/@Post-${post.id}`;
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
  const router = useRouter();
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
          content={`${userInfo?.user?.nickname}의 기술 아카이브. 개발 과정에서 배운 문제 해결 방법과 경험을 기록합니다.`}
        />
        <meta property="og:title" content="Librarian's Archive" />
        <meta
          property="og:description"
          content={`Frontend, Backend, DevOps 기술 아카이브 · ${posts.length}개의 기록`}
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
              <span>신뢰 가능한</span>
              <span>소프트웨어는</span>
              <span>관찰 가능한</span>
              <span>설계에서</span>
              <span>시작된다.</span>
            </p>
          </aside>

          <article className="editorial-featured">
            <div className="editorial-issue">
              <span>ISSUE</span>
              <strong>{issueNumber}</strong>
            </div>

            <p className="editorial-eyebrow">
              {primaryPost?.category?.categoryTitle || "ENGINEERING NOTE"}
              <span aria-hidden="true">/</span>
              FEATURED
            </p>
            <h1 id="featured-post-title" className="editorial-display">
              {primaryPost?.title || "기술과 경험을 오래 남는 기록으로 만듭니다."}
            </h1>
            <div className="editorial-proof-line" aria-hidden="true" />
            <p className="editorial-deck">
              {primaryPost?.excerpt ||
                "복잡한 문제를 풀며 발견한 판단 기준과 시행착오를 기록합니다."}
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
            <button
              type="button"
              onClick={() => router.push(getPostPath(primaryPost))}
              className="editorial-read-link"
            >
              글 읽기 <ArrowUpRight aria-hidden="true" />
            </button>
          </article>

          <aside className="editorial-latest" aria-labelledby="latest-notes-title">
            <div className="editorial-section-heading">
              <h2 id="latest-notes-title">Latest notes</h2>
              <span>계속 기록하는 중</span>
            </div>

            <div className="editorial-latest-list">
              {latestPosts.length > 0 ? (
                latestPosts.map((post, index) => (
                  <button
                    type="button"
                    key={post.id}
                    onClick={() => router.push(getPostPath(post))}
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
                  </button>
                ))
              ) : (
                <p className="editorial-empty">
                  첫 번째 기록을 준비하고 있습니다.
                </p>
              )}
            </div>
          </aside>
        </section>

        <section className="editorial-index-section" aria-labelledby="archive-index-title">
          <div className="editorial-index-header">
            <div>
              <span>ARCHIVE / {String(posts.length).padStart(3, "0")}</span>
              <h2 id="archive-index-title">기술 기록 인덱스</h2>
            </div>
            <button type="button" onClick={() => router.push("/all-posts-page")}>
              모든 글 보기 <ArrowRight aria-hidden="true" />
            </button>
          </div>

          <div className="editorial-table" role="list">
            <div className="editorial-table-head" aria-hidden="true">
              <span>NO.</span>
              <span>CATEGORY</span>
              <span>DATE</span>
              <span>TITLE / ABSTRACT</span>
              <span>READ</span>
            </div>
            {indexedPosts.map((post, index) => (
              <button
                type="button"
                role="listitem"
                key={post.id}
                onClick={() => router.push(getPostPath(post))}
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
              </button>
            ))}
          </div>
        </section>

        <section className="editorial-discovery" aria-label="주제별 탐색">
          <div className="editorial-discovery-intro">
            <span>DISCOVER / BY SUBJECT</span>
            <h2>관심 있는 문제부터<br />기록을 탐색하세요.</h2>
            <p>
              기술 스택보다 해결하려 했던 문제와 판단의 맥락을 중심으로
              기록합니다.
            </p>
          </div>

          <div className="editorial-categories">
            {categories.map((parent) => {
              const isExpanded = expandedCategories.has(parent.categoryTitle);
              const postCount = parent.subCategories?.reduce(
                (sum, sub) => sum + (sub.post?.length || 0),
                0
              );

              return (
                <div className="editorial-category" key={parent.categoryTitle}>
                  <button
                    type="button"
                    onClick={() => toggleCategory(parent.categoryTitle)}
                    aria-expanded={isExpanded}
                  >
                    <span>{parent.categoryTitle}</span>
                    <span className="editorial-category-count">
                      {String(postCount || 0).padStart(2, "0")}
                      <ChevronDown aria-hidden="true" />
                    </span>
                  </button>
                  <div className={`editorial-subcategory-reveal ${isExpanded ? "is-open" : ""}`}>
                    <div>
                      {parent.subCategories?.map((sub) => (
                        <button
                          type="button"
                          key={sub.categoryTitle}
                          onClick={() =>
                            router.push(
                              `/post/${parent.categoryTitle}/${sub.categoryTitle}`
                            )
                          }
                        >
                          <CornerDownRight aria-hidden="true" />
                          {sub.categoryTitle}
                          <span>{sub.post?.length || 0}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="editorial-tags">
            <span>POPULAR INDEX</span>
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
            <span>WRITTEN AND MAINTAINED BY</span>
            <strong>{userInfo?.user?.nickname || "Park SeongHyun"}</strong>
            <small>{userInfo?.user?.role || "Software Engineer"}</small>
          </div>
          <p>{userInfo?.user?.introduce}</p>
          <button type="button" onClick={() => router.push("/about")}>
            프로필 보기 <ArrowRight aria-hidden="true" />
          </button>
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
