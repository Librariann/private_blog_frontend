import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "../components/input";
import Button from "@/components/button";
import { register } from "module";
import FormError from "@/components/form-error";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "./gql/graphql";
import { useRouter } from "next/navigation";
interface ICreateAccountForm {
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

function CreateAccount() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
  });

  const navigate = useRouter();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (ok) {
      alert("계정이 생성 됐습니다.");
      navigate.push("/login");
    } else {
      alert(error);
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
      const { email, password } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password },
        },
      });
    }
  };
  return (
    <div className="grid grid-rows-1 justify-center">
      <h1 className="mt-60 font-bold md:text-4xl text-center">회원가입</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-3 mt-5 mb-5 w-full"
      >
        <input
          {...register("email", {
            required: "이메일 형식에 맞게 작성해주세요",
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
            required: "비밀번호는 필수 입니다.",
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
          actionText="계정생성"
        ></Button>
      </form>
    </div>
  );
}

export default CreateAccount;
