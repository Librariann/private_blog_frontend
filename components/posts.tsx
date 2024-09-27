import { PostsProps } from "@/pages";
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

const Posts = ({ post }: { post: PostsProps }) => {
  const commentsArray = Array.isArray(post.comments)
    ? post.comments
    : [post.comments];
  return (
    <li className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-6 p-2 flex justify-center">
      <Link
        href={`/${post.category.categoryTitle}/${post.id}`}
        className="w-full"
      >
        <div className="relative w-full h-72">
          <Image
            src="/images/noimage.webp"
            fill
            alt="No image available"
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority
          />
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm">
            <PostTitle className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {post.title}
            </PostTitle>
            <PostContents className="header-color text-gray-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              {post.contents}
            </PostContents>
            <PostBottom className="text-gray-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              <span className="line-clamp-3 mr-4">
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
