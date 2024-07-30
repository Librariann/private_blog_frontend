"use client";

import { authTokenVar, isLoggedInVar } from "@/apollo";
import { LOCAL_STORAGE_TOKEN } from "@/common/constants";
import UserInfo from "@/components/user-info";
import { useMe } from "@/hooks/useMe";

export default function Home() {
  const logout = () => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, "");
  };

  return (
    <>
      <div className="">Hello World!</div>
      <UserInfo />
      <button onClick={logout}>로그아웃</button>
    </>
  );
}
