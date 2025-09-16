const PostList = ({ posts }: { posts: PostsProps[] }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="p-10 text-center">해당 카테고리에 게시물이 없습니다.</div>
    );
  }

  return (
    <div className="p-10">
      <ul className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto"></ul>
    </div>
  );
};

export default PostList;
