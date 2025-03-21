import Skeleton from "./skeleton";

const CategorySkeleton: React.FC = () => {
  return (
    <ul className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <li key={index} className="px-4 py-3 rounded-lg">
          <div className="flex items-center justify-between">
            <Skeleton width="120px" height="16px" />
            <Skeleton width="30px" height="20px" className="rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategorySkeleton;
