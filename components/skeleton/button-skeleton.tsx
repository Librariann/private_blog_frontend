import Skeleton from "./skeleton";

const ButtonSkeleton: React.FC = () => {
  return (
    <div className="w-full md:w-auto">
      <Skeleton width="100%" height="40px" className="rounded-md" />
    </div>
  );
};

export default ButtonSkeleton;
