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
      className={`text-lg font-medium focus:outline-none text-white py-2 transition-colors ${
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
