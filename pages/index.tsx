"use client";

import { authTokenVar, isLoggedInVar } from "@/apollo";
import { LOCAL_STORAGE_TOKEN } from "@/common/constants";
import UserInfo from "@/components/user-info";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const logout = () => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, "");
    router.push("/login");
  };

  const routerTest = () => {
    router.push("/TEST");
  };

  return (
    <>
      <div className="">Hello World!</div>
      <UserInfo />
      <button onClick={logout}>로그아웃</button>
      <span
        className="cursor-pointer font-bold text-xl underline decoration-sky-500 hover:text-red-600"
        onClick={routerTest}
      >
        여기
      </span>
    </>
  );
}
