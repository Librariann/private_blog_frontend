"use client";

import { useForm } from "react-hook-form";
import FormError from "@/components/form-error";
import { gql, useMutation } from "@apollo/client";
import Button from "@/components/buttons/button";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_TOKEN } from "@/common/constants";
import { authTokenVar, isLoggedInVar } from "@/apollo";
import { LoginMutation, LoginMutationVariables } from "@/gql/graphql";
import Link from "next/link";
import Head from "next/head";
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

  return (
    <>
      <Head><title>로그인 | Librarian&apos;s Blog</title></Head>
      <main className="editorial-auth-page">
        <section className="editorial-auth-intro">
          <span className="editorial-kicker">Private desk / Access</span>
          <span className="editorial-auth-index">A</span>
          <h1>기록을 관리하는<br />작업실로 들어갑니다.</h1>
          <p>발행, 분류, 댓글 관리 도구는 운영자에게만 열려 있습니다.</p>
        </section>
        <form onSubmit={handleSubmit(onSubmit)} className="editorial-auth-form">
          <span className="editorial-section-label">Sign in</span>
          <label><span>Email</span>
        <input
          {...register("email", {
            required: "Email is required",
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          className="editorial-field"
          type="email"
          required
          placeholder="Email"
        /></label>
        {errors.email?.type === "pattern" && (
          <FormError errorMessage={"Please enter a valid email"} />
        )}
        {errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )}
        <label><span>Password</span><input
          {...register("password", {
            required: "Password is required",
          })}
          className="editorial-field"
          type="password"
          placeholder="Password"
        /></label>
        {errors.password?.type === "pattern" && (
          <FormError errorMessage={"Please enter a valid password"} />
        )}
        {errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        )}
          <Button canClick={isValid} loading={loading} actionText="로그인 →" />
          <p className="editorial-auth-switch">계정이 없나요? <Link href="/create-account">접근 요청</Link></p>
        </form>
      </main>
    </>
  );
}
