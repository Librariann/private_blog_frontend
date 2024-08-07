"use client";

interface IFormErrorProps {
  errorMessage: string;
}

const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {
  return (
    <span role="alert" className="font-medium text-red-500">
      {errorMessage}
    </span>
  );
};

export default FormError;
