import { ChangeEventHandler } from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

const Button: React.FC<IButtonProps> = ({ canClick, loading, actionText }) => {
  return (
    <button
      data-testid="button"
      className={`w-full md:w-auto py-3 text-base md:text-lg px-6 bg-blue-500 rounded-md hover:bg-blue-600 text-lg font-medium focus:outline-none text-white py-2 transition-colors ${
        canClick
          ? "bg-blue-500 hover:bg-blue-700"
          : "bg-gray-300 pointer-events-none"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};

export default Button;
