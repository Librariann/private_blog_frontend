import Button from "@/components/button";
import UserInfo from "@/components/user-info";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables,
} from "@/gql/graphql";
import { CategoryAddForm } from "@/components/category-add-form";

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">마이페이지</h1>
          <p className="text-gray-600">계정 설정 및 관리</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            사용자 정보
          </h2>
          <UserInfo />
        </div>

        {/* Password Change Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            비밀번호 변경
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                새 비밀번호
              </label>
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  minLength: {
                    value: 6,
                    message: "비밀번호는 최소 6자 이상이어야 합니다",
                  },
                })}
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="새 비밀번호를 입력하세요"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="checkPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                비밀번호 확인
              </label>
              <input
                {...register("checkPassword", {
                  required: "비밀번호 확인을 입력해주세요",
                  validate: (value) =>
                    value === getValues("password") ||
                    "비밀번호가 일치하지 않습니다",
                })}
                type="password"
                id="checkPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="비밀번호를 다시 입력하세요"
              />
              {errors.checkPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.checkPassword.message}
                </p>
              )}
            </div>
            <div className="pt-2">
              <Button
                canClick={isValid}
                loading={loading}
                actionText="비밀번호 변경"
              />
            </div>
          </form>
        </div>

        {/* Category Management Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            카테고리 관리
          </h2>
          <CategoryAddForm />
        </div>

        {/* Navigation */}
        <div className="flex justify-center pt-4">
          <button
            onClick={routingMainPage}
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
