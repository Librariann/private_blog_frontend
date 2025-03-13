import { ChangeEventHandler, MouseEventHandler } from "react";
import ButtonSkeleton from "./skeleton/button-skeleton";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
  onClick,
}) => {
  if (loading) {
    return <ButtonSkeleton />;
  }

  return (
    <button
      onClick={onClick}
      data-testid="button"
      className={`w-full md:w-auto py-2 text-base md:text-lg px-4 bg-blue-500 rounded-md hover:bg-blue-600 text-lg font-medium focus:outline-none text-white py-2 transition-colors ${
        canClick
          ? "bg-blue-500 hover:bg-blue-700"
          : "bg-gray-300 pointer-events-none"
      }`}
    >
      {actionText}
    </button>
  );
};

export default Button;
