import { ArrowLeft, Calendar, Clock, List } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
  Post,
} from "@/gql/graphql";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import dynamic from "next/dynamic";
import Comments from "../comments/comments";
import PostNavigation from "./post-navigation";
import PostTags from "./post-tags";
import { useMe } from "@/hooks/useMe";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { remark } from "remark";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import { useUpdatePostHits } from "@/hooks/hooks";
import Head from "next/head";
import { Heading, PhrasingContent, Root, Text } from "mdast";
import { useQuery } from "@apollo/client";
import { GET_POST_BY_ID_QUERY } from "@/lib/queries";

type topicProps = {
  id: string;
  title: string;
}[];
export type PostDetailPageProps = {
  post: GetPostByIdQuery["getPostById"];
};

const PostDetail = ({ post }: PostDetailPageProps) => {
  const postId = Number(post?.post?.id);
  const { data: postDater } = useQuery<
    GetPostByIdQuery,
    GetPostByIdQueryVariables
  >(GET_POST_BY_ID_QUERY, {
    variables: { postId },
    skip: !postId,
  });
  const router = useRouter();
  const postData = postDater?.getPostById?.post || post?.post;
  const { isDarkMode } = useDarkModeStore();
  const { data } = useMe();

  const [isTocOpen, setIsTocOpen] = useState(true);
  const { updatePostHitsMutation } = useUpdatePostHits({
    postId: postData?.id!,
  });
  useEffect(() => {
    if (
      postData?.postStatus !== "PUBLISHED" &&
      data?.me?.id &&
      postData?.user?.id &&
      Number(data?.me?.id) !== Number(postData?.user?.id)
    ) {
      toast.error("접근 권한이 없습니다.");
      router.push("/");
    }
  }, [post, data, router]);

  // 목차 항목들
  const tocItems: topicProps = [];
  const filterH1 = postData?.contents
    ?.match(/^#\s+(.+)/gm)
    ?.map((match) => match.replace(/^#\s+/, ""));

  filterH1?.map((h1) => {
    const items = {
      id: h1.replace(" ", "-"),
      title: h1,
    };
    tocItems.push(items);
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // 헤더 높이만큼 여유
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // 포맷팅된 날짜 (클라이언트에서만)
  const formattedDate = new Date(postData?.createdAt).toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const EditorMarkdown = dynamic(
    () =>
      import("@uiw/react-md-editor").then((mod) => {
        return mod.default.Markdown;
      }),
    { ssr: false }
  );

  useEffect(() => {
    const updateHits = async () => {
      //마지막 조회시간 확인
      const lastViewTime = localStorage.getItem(
        `post-${postData?.id}-lastView`
      );
      const now = new Date().getTime();
      // 마지막 조회시간이 1일 이상 지났으면 조회수 증가
      if (!lastViewTime || now - parseInt(lastViewTime) > 24 * 60 * 60 * 1000) {
        try {
          await updatePostHitsMutation({
            variables: {
              postId: postData?.id!,
            },
          });
          // 현재 시간을 저장
          localStorage.setItem(`post-${postData?.id}-lastView`, now.toString());
        } catch (error) {
          console.error("조회수 업데이트 실패:", error);
        }
      }
    };
    updateHits();
  }, [updatePostHitsMutation, postData?.id]);

  type HeadingsType = {
    level: string | number;
    text: string;
    id: string;
  };

  const isTextNode = (node: PhrasingContent): node is Text => {
    return node.type === "text";
  };

  const extractHeadings = (markdown: string) => {
    const tree: Root = remark().parse(markdown); // await 제거
    const headings: HeadingsType[] = [];

    tree.children.forEach((node) => {
      if (node.type === "heading" && node.depth < 2) {
        const heading = node as Heading;
        const firstChild = heading.children[0];
        if (firstChild && isTextNode(firstChild)) {
          const text = firstChild.value;
          headings.push({
            level: heading.depth,
            text: text,
            id: text
              .replace(/[^a-zA-Z0-9가-힣\s]/g, "")
              .toLowerCase()
              .replace(/\s+/g, "-"),
          });
        }
      }
    });

    return headings;
  };

  const headings = useMemo(
    () => extractHeadings(postData?.contents || ""),
    [postData?.contents]
  );
  return (
    <>
      <Head>
        <title>{postData?.title} | Librarian&apos;s</title>
        <meta
          name="description"
          content={postData?.excerpt || postData?.contents.substring(0, 150)}
        />
        <meta property="og:title" content={postData?.title} />
        <meta property="og:description" content={postData?.excerpt ?? ""} />
        <meta property="og:image" content={postData?.thumbnailUrl ?? ""} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://librarian-blog.dev${router.asPath}`}
        />
      </Head>
      <main className="editorial-article-page">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="editorial-back"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>목록으로</span>
        </button>

        {/* Post Header */}
        <article>
          <header className="editorial-article-header">
            <span className="editorial-kicker">{postData?.category?.categoryTitle} / Field note</span>
            <h1>{postData?.title}</h1>
            {postData?.excerpt && <p>{postData.excerpt}</p>}
            <div className="editorial-article-meta">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{postData?.readTime}분 읽기</span>
              </div>
            </div>
          </header>

          {/* Table of Contents */}
          {tocItems.length > 0 && (
            <div className="editorial-toc">
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="editorial-toc-trigger"
              >
                <div className="flex items-center space-x-3">
                  <List className="w-4 h-4" />
                  <span>Contents</span>
                </div>
                <motion.div
                  animate={{ rotate: isTocOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isTocOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="editorial-toc-list">
                      <nav className="space-y-2 mt-4">
                        {headings.map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            onClick={() => scrollToSection(item.id)}
                            className="editorial-toc-link"
                          >
                            <div className="flex items-center space-x-2">
                              <span>{String(index + 1).padStart(2, "0")}</span>
                              <span>{item.text}</span>
                            </div>
                          </motion.button>
                        ))}
                      </nav>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Post Content */}
          <div
            className="editorial-article-body"
            data-color-mode={isDarkMode ? "dark" : "light"}
          >
            <EditorMarkdown
              className="editorial-post-content"
              source={postData?.contents}
              style={{ backgroundColor: "transparent" }}
              remarkPlugins={[remarkBreaks]}
              rehypePlugins={[rehypeSlug]}
            />
          </div>

          {/* Tags */}
          <PostTags hashtags={postData?.hashtags ?? []} />
        </article>

        {/* Comments Section */}
        <Comments comments={postData?.comments ?? []} postId={postId} />

        {/* Previous/Next Posts Navigation */}
        {postData && (post?.prevPost || post?.nextPost) && (
          <PostNavigation
            post={postData}
            prevPost={post?.prevPost ?? null}
            nextPost={post?.nextPost ?? null}
          />
        )}
      </main>
    </>
  );
};

export default PostDetail;
