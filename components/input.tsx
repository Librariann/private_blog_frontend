import { ChangeEventHandler } from "react";
import { useForm } from "react-hook-form";

interface IInput {
  className: string;
  type: string;
  placeholder: string;
  onChange?: (text: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

interface ISignUpForm {
  email: string;
  password: string;
}

const Input: React.FC<IInput> = ({
  className,
  type,
  placeholder,
  onChange,
  value,
}) => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({
    mode: "onChange",
  });
  let getInputType = type;
  if (getInputType !== "email") {
    return;
  }

  if (getInputType !== "password") {
    return;
  }

  return (
    <input
      {...register(getInputType, {
        required: "Email is required",
        pattern:
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      })}
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
