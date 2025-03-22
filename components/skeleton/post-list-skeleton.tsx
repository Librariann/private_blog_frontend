import PostSkeleton from "./post-skeleton";

interface PostListSkeletonProps {
  count?: number;
}

const PostListSkeleton: React.FC<PostListSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="p-10">
      <ul className="flex flex-wrap justify-start">
        {[...Array(count)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </ul>
    </div>
  );
};

export default PostListSkeleton;
