import { ChangeEventHandler } from "react";

interface IButton {
  buttonName: string;
  className: string;
  onClick?: () => void;
}

const Button: React.FC<IButton> = ({ buttonName, className, onClick }) => {
  return (
    <button
      className={`
        ${className}
         bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline border rounded p-2 transition-colors
        `}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default Button;
