import { PostProps } from "@/pages/[contents]/[id]";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const PostTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const PostContents = styled.div`
  margin-top: 2px;
`;

const PostBottom = styled.div``;

const Posts = ({ post }: PostProps) => {
  const commentsArray = Array.isArray(post.comments)
    ? post.comments
    : [post.comments];
  return (
    <li
      key={post.id}
      className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-6 p-2"
    >
      <Link href={`/${post.category.categoryTitle}/${post.id}`}>
        <div className="relative w-full h-72">
          <Image
            src="/images/noimage.webp"
            width={300}
            height={200}
            alt="No image available"
            className="w-[300px] h-[200px] object-contain"
          />
          <div className="p-2">
            <PostTitle>{post.title}</PostTitle>
            <PostContents className="header-color">
              {post.contents}
            </PostContents>
            <PostBottom>
              <span className="line-clamp-3">
                댓글 수:{commentsArray.length}
              </span>
              <span>좋아요 수:{post.hits}</span>
            </PostBottom>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default Posts;
