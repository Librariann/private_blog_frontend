interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className = "", 
  width = "100%", 
  height = "1rem" 
}) => {
  return (
    <div
      className={`animate-pulse bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-[200%_100%] animate-shimmer rounded ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
