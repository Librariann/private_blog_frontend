const PostDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 animate-pulse">
      <div className="mb-6">
        {/* 타이틀 스켈레톤 */}
        <div className="h-16 bg-gray-300 rounded-lg mb-4 w-3/4"></div>
        
        {/* 조회수, 작성일 스켈레톤 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="h-5 bg-gray-300 rounded w-24"></div>
            <div className="h-5 bg-gray-300 rounded w-40"></div>
          </div>
          <div className="h-5 bg-gray-300 rounded w-12"></div>
        </div>

        {/* 해시태그 스켈레톤 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="h-7 bg-gray-300 rounded-full w-20"></div>
          <div className="h-7 bg-gray-300 rounded-full w-24"></div>
          <div className="h-7 bg-gray-300 rounded-full w-16"></div>
        </div>
      </div>

      {/* 본문 스켈레톤 */}
      <div className="prose prose-lg max-w-none mb-36 space-y-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
        
        <div className="h-8 bg-gray-300 rounded w-2/3 mt-8"></div>
        
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        
        <div className="h-8 bg-gray-300 rounded w-1/2 mt-8"></div>
        
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-4/5"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      {/* 댓글 작성 스켈레톤 */}
      <div className="mb-8">
        <div className="h-10 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-32 bg-gray-300 rounded w-full"></div>
      </div>

      {/* 댓글 목록 스켈레톤 */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-b border-gray-200 pb-4">
            <div className="h-5 bg-gray-300 rounded w-40 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
