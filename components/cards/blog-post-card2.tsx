import { BlogPostCardProps } from "./blog-post-card";
import { formatNumberConvertK } from "@/utils/utils";
import { ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";

const BlogPostCard2 = ({ post }: BlogPostCardProps) => {
  const date = new Date(post.createdAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <article className="editorial-post-row group">
      <Link
        href={`/post/${encodeURIComponent(post.category?.parentCategory?.categoryTitle || "")}/${encodeURIComponent(post.category?.categoryTitle || "")}/@Post-${post.id}`}
        className="editorial-post-row-button"
      >
        <div className="editorial-post-row-meta">
          <span>{post.category?.categoryTitle || "NOTE"}</span>
          <time>{date}</time>
        </div>
        <div className="editorial-post-row-copy">
          <h3>{post.title}</h3>
          {post.excerpt && <p>{post.excerpt}</p>}
          <div className="editorial-post-row-foot">
            <span className="flex items-center gap-1">
              <Eye aria-hidden="true" /> {formatNumberConvertK(post.hits)}
            </span>
            <span>{post.readTime} MIN READ</span>
            {post.hashtags?.slice(0, 3).map((tag) => (
              <span key={tag.hashtag}>#{tag.hashtag}</span>
            ))}
          </div>
        </div>
        {post.thumbnailUrl && (
          <img src={post.thumbnailUrl} alt="" className="editorial-post-row-image" />
        )}
        <ArrowUpRight className="editorial-post-row-arrow" aria-hidden="true" />
      </Link>
    </article>
  );
};

export default BlogPostCard2;
