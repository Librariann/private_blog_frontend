"use client";

import { authTokenVar, client, isLoggedInVar } from "@/apollo";
import { LOCAL_STORAGE_TOKEN } from "@/common/constants";
import { useRouter } from "next/router";

export const clearToken = () => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN, "");
  authTokenVar(null);
  isLoggedInVar(false);
  client.resetStore(); // Apollo Client 캐시 초기화
};

export default function Home() {
  const router = useRouter();

  const logout = () => {
    clearToken();
    router.push("/login");
  };

  const myPage = () => {
    router.push("/my-page");
  };

  return (
    <>
      <div className="">Hello World!</div>
      <button onClick={myPage}>MyPage</button>
      <button onClick={logout}>로그아웃</button>
    </>
  );
}
