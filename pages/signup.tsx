import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../components/input";
import Button from "@/components/button";
import { register } from "module";
import FormError from "@/components/form-error";
interface ISignUpForm {
  email: string;
  password: string;
}

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

function SignUp() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignUpForm>({
    mode: "onChange",
  });
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      //redirect
      navigate("/");
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );
  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };
  return (
    <div className="grid grid-rows-1 justify-center">
      <h1 className="mt-60 font-bold md:text-4xl text-center">회원가입</h1>
      <form onSubmit={}>
        <input
          {...register("email", {
            required: "Email is required",
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className={`mt-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="email"
          required
          placeholder="Email"
        />
        {errors.email?.type === "pattern" && (
          <FormError errorMessage={"Please enter a valid email"} />
        )}
        {errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )}
        <input
          {...register("password", {
            required: "Password is required",
          })}
          className={`mt-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
          type="password"
          placeholder="Passowrd"
        />
        {errors.password?.type === "pattern" && (
          <FormError errorMessage={"Please enter a valid password"} />
        )}
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
        <Button className="mt-6" buttonName="회원가입"></Button>
      </form>
    </div>
  );
}

export default SignUp;
