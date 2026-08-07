import { MouseEventHandler } from "react";

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

  return (
    <button
      onClick={onClick}
      data-testid="button"
      disabled={!canClick || loading}
      className="editorial-primary-button"
    >
      {actionText}
    </button>
  );
};

export default Button;
