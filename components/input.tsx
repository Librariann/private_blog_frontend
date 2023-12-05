import { ChangeEventHandler } from "react";

interface IInput {
  className: string;
  type: string;
  placeholder: string;
  onChange?: (text: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input: React.FC<IInput> = ({
  className,
  type,
  placeholder,
  onChange,
  value,
}) => {
  return (
    <input
      className={`
        ${className} 
         shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
        `}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
