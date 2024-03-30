import Button from "@/components/button";
import Input from "@/components/input";
import UserInfo from "@/components/user-info";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
} from "./gql/graphql";

interface IChangePasswordForm {
  password: string;
  checkPassword: string;
}

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password) {
      ok
      message
    }
  }
`;

const MyPage = () => {
  const [password, setPassword] = useState<string>();
  const [checkPassword, setCheckPassword] = useState<string>();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IChangePasswordForm>({
    mode: "onChange",
  });

  const [changePasswordMutation] = useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(CHANGE_PASSWORD_MUTATION);

  const router = useRouter();

  const routingMainPage = () => {
    router.push("/");
  };

  const onSubmit = async () => {
    const { password, checkPassword } = getValues();
    if (password === checkPassword) {
      const result = await changePasswordMutation({
        variables: {
          password,
        },
      });
      alert(result.data?.changePassword.message);
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
              // onChange={statePassword}
            />
          </li>
          <li>
            <input
              {...register("checkPassword")}
              type="password"
              className="checkPassword"
              // onChange={stateCheckPassword}
            />
          </li>
        </ul>
        <Button canClick={isValid} loading={false} actionText="변경"></Button>
      </form>
      <button onClick={routingMainPage}>메인으로</button>
    </>
  );
};

export default MyPage;
