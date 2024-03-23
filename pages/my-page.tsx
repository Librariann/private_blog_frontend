import Button from "@/components/button";
import Input from "@/components/input";
import UserInfo from "@/components/user-info";
import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IChangePasswordForm {
  password: string;
  checkPassword: string;
}

// export const CHANGE_PASSWORD_MUTATION = gql`
//   mutation changePassword(password: string) {
//     changePassword(password: string) {
//       ok
//       message
//     }
//   }
// `;

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

  const router = useRouter();

  const routingMainPage = () => {
    router.push("/");
  };

  const statePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const stateCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  const onSubmit = () => {
    const { password, checkPassword } = getValues();
    console.log(password, checkPassword);
    // CHANGE_PASSWORD_MUTATION({
    //   variables: {
    //     loginInput: { email, password },
    //   },
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserInfo />
      <ul>
        <li>비밀번호 변경:</li>
        <li>
          <input
            {...register("password")}
            type="password"
            className="password"
            onChange={statePassword}
          />
        </li>
        <li>
          <input
            {...register("checkPassword")}
            type="password"
            className="checkPassword"
            onChange={stateCheckPassword}
          />
        </li>
      </ul>
      <Button canClick={isValid} loading={false} actionText="변경"></Button>
      <button onClick={routingMainPage}>메인으로</button>
    </form>
  );
};

export default MyPage;
