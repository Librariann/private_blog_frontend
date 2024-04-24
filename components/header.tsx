"use client";

import { authTokenVar, client, getToken, isLoggedInVar } from "@/apollo";
import { LOCAL_STORAGE_TOKEN } from "@/common/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useRouter();
  const [isToken, setIsToken] = useState<string | null>();

  useEffect(() => {
    const token = getToken();
    setIsToken(token);
  }, []);

  const clearToken = () => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, "");
    authTokenVar(null);
    isLoggedInVar(false);
    client.resetStore(); // Apollo Client 캐시 초기화
  };

  const logout = () => {
    clearToken();
    navigate.push("/");
  };

  const myPage = () => {
    navigate.push("/my-page");
  };

  const handleAuth = () => {
    if (isToken) {
      logout();
    } else {
      navigate.push("/login");
    }
  };
  return (
    <div className="w-full h-16 flex items-center bg-header-color pl-5">
      <div
        className="font-bold text-3xl text-white cursor-pointer"
        onClick={() => navigate.push("/")}
      >
        Librarian.blog
      </div>
      <div className="flex ml-auto pr-5 text-white cursor-pointer">
        {isToken && <div onClick={myPage}>유저 정보</div>}
        &nbsp;&nbsp;&nbsp;
        {isToken ? (
          <div onClick={handleAuth}>로그아웃</div>
        ) : (
          <div onClick={handleAuth}>로그인</div>
        )}
      </div>
    </div>
  );
};

export default Header;
