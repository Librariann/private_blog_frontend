import PostSkeleton from "./post-skeleton";

interface PostListSkeletonProps {
  count?: number;
}

const PostListSkeleton: React.FC<PostListSkeletonProps> = ({ count = 6 }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </>
  );
};

export default PostListSkeleton;
