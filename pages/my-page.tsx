import Button from "@/components/button";
import Input from "@/components/input";
import UserInfo from "@/components/user-info";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables,
} from "./gql/graphql";

interface IUpdatePasswordForm {
  password: string;
  checkPassword: string;
}

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword($password: String!) {
    updatePassword(password: $password) {
      ok
      error
      message
    }
  }
`;

const MyPage = () => {
  const router = useRouter();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUpdatePasswordForm>({
    mode: "onChange",
  });

  const onCompleted = (data: UpdatePasswordMutation) => {
    const {
      updatePassword: { ok, error, message },
    } = data;

    if (ok) {
      alert(message);
      router.push("/");
    } else {
      alert(error);
    }
  };

  const [
    updatePasswordMutation,
    { loading, data: updatePasswordMutationResult },
  ] = useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(
    UPDATE_PASSWORD_MUTATION,
    {
      onCompleted,
    }
  );

  const routingMainPage = () => {
    router.push("/");
  };

  const onSubmit = async () => {
    const { password, checkPassword } = getValues();
    if (password === checkPassword) {
      updatePasswordMutation({
        variables: {
          password,
        },
      });
    } else {
      alert("비밀번호가 다릅니다.");
    }
  };

  return (
    <>
      <UserInfo />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
          <li>비밀번호 변경:</li>
          <li>
            <input
              {...register("password")}
              type="password"
              className="password"
            />
          </li>
          <li>
            <input
              {...register("checkPassword")}
              type="password"
              className="checkPassword"
            />
          </li>
        </ul>
        <Button canClick={isValid} loading={loading} actionText="변경"></Button>
      </form>
      <button onClick={routingMainPage}>메인으로</button>
    </>
  );
};

export default MyPage;
