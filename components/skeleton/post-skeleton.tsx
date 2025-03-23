import Skeleton from "./skeleton";

const PostSkeleton: React.FC = () => {
  return (
    <li className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 mb-6 w-full md:w-80 md:mr-6">
      <div className="space-y-4">
        {/* Category */}
        <Skeleton width="80px" height="20px" className="rounded-full" />
        
        {/* Title */}
        <Skeleton width="100%" height="24px" />
        <Skeleton width="75%" height="24px" />
        
        {/* Content preview */}
        <div className="space-y-2">
          <Skeleton width="100%" height="16px" />
          <Skeleton width="90%" height="16px" />
          <Skeleton width="85%" height="16px" />
        </div>
        
        {/* Hashtags */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton width="60px" height="20px" className="rounded-full" />
          <Skeleton width="80px" height="20px" className="rounded-full" />
          <Skeleton width="70px" height="20px" className="rounded-full" />
        </div>
        
        {/* Stats */}
        <div className="flex justify-between items-center pt-4">
          <Skeleton width="80px" height="16px" />
          <Skeleton width="60px" height="16px" />
        </div>
      </div>
    </li>
  );
};

export default PostSkeleton;
