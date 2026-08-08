import { GetPostByIdQuery, Post } from "@/gql/graphql";
import { formatDateShort } from "@/utils/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/router";

type navationType = Pick<
  Post,
  "id" | "title" | "createdAt" | "readTime"
> | null;

export type PostNavigationProps = {
  post: {
    id: number;
    title: string;
    createdAt?: Date;
    readTime: number;
    category?: {
      id: number;
      categoryTitle: string;
      parentCategory?: {
        categoryTitle: string;
      } | null;
    } | null;
  };
  prevPost: navationType;
  nextPost: navationType;
};

const PostNavigation = ({ post, prevPost, nextPost }: PostNavigationProps) => {
  const postBasePath = `/post/${post.category?.parentCategory?.categoryTitle}/${post.category?.categoryTitle}`;
  const router = useRouter();
  return (
    <nav className="editorial-post-navigation" aria-label="이전 및 다음 글">
      {prevPost ? (
        <button
          onClick={() => router.push(`${postBasePath}/@Post-${prevPost.id}`)}
          className="editorial-post-nav-link"
        >
          <div className="editorial-post-nav-label">
            <ArrowLeft className="w-4 h-4" />
            <span>이전글</span>
          </div>
          <h4>{prevPost.title}</h4>
          <p>
            {formatDateShort(prevPost?.createdAt)} • {prevPost?.readTime}분
          </p>
        </button>
      ) : (
        <div className="editorial-post-nav-empty">
          <div>이전글이 없습니다</div>
        </div>
      )}

      {nextPost ? (
        <button
          onClick={() => router.push(`${postBasePath}/@Post-${nextPost.id}`)}
          className="editorial-post-nav-link is-next"
        >
          <div className="editorial-post-nav-label">
            <span>다음글</span>
            <ArrowRight className="w-4 h-4" />
          </div>
          <h4>{nextPost?.title}</h4>
          <p>
            {formatDateShort(nextPost?.createdAt)} • {nextPost?.readTime}분
          </p>
        </button>
      ) : (
        <div className="editorial-post-nav-empty is-next">
          <div>다음글이 없습니다</div>
        </div>
      )}
    </nav>
  );
};

export default PostNavigation;
