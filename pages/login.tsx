"use client";

import { useForm } from "react-hook-form";
import FormError from "@/components/form-error";
import { gql, useMutation } from "@apollo/client";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_TOKEN } from "@/common/constants";
import { authTokenVar, isLoggedInVar } from "@/apollo";
import { LoginMutation, LoginMutationVariables } from "@/gql/graphql";
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

export default function Login() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const navigate = useRouter();

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, error, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
      navigate.push("/");
    } else {
      alert(error);
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

  const redirectCreateAccount = () => {
    navigate.push("/create-account");
  };

  return (
    <div className="grid grid-rows-1 justify-center">
      <h1 className="mt-60 font-bold md:text-4xl text-center">LOGIN</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 mt-5 mb-5 w-full"
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="input-new"
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
          className="input-new"
          type="password"
          placeholder="Passowrd"
        />
        {errors.password?.type === "pattern" && (
          <FormError errorMessage={"Please enter a valid password"} />
        )}
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
        <Button
          canClick={isValid}
          loading={loading}
          actionText="로그인"
        ></Button>
      </form>
      <div>
        계정이 없으신 분들은{" "}
        <span
          className="cursor-pointer font-bold text-xl underline decoration-sky-500 hover:text-red-600"
          onClick={redirectCreateAccount}
        >
          여기
        </span>
        를 클릭해주세요
      </div>
    </div>
  );
}
