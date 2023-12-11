import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import FormError from "@/components/form-error";
import { gql, useMutation } from "@apollo/client";
import { LoginMutation, LoginMutationVariables } from "./gql/graphql";
interface ILoginForm {
  email: string;
  password: string;
}

export const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      alert("Account Created! Log in now!");
      console.log(token);
      //redirect
      //navigate("/");
    }
  };
  const [loginMutation, { loading, data: loginMutationResult }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: { email, password },
        },
      });
    }
  };
  return (
    <div className="grid grid-rows-1 justify-center">
      <h1 className="mt-60 font-bold md:text-4xl text-center">LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Link href="/">
          <button className="p-2 mt-7">LOGIN</button>
        </Link>
        <div>
          <Link href="join">회원가입</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
