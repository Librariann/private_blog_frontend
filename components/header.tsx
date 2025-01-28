"use client";
import { authTokenVar, client, getToken, isLoggedInVar } from "@/apollo";
import { LOCAL_STORAGE_TOKEN } from "@/common/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMe } from "@/hooks/useMe";
import ConfirmModal from "./modal/confirm-modal";

const Header = ({ onMenuToggle }: { onMenuToggle: () => void }) => {
  const navigate = useRouter();
  const [isToken, setIsToken] = useState<string | null>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data } = useMe();

  useEffect(() => {
    const token = getToken();
    setIsToken(token);
  }, []);

  const clearToken = () => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, "");
    authTokenVar(null);
    isLoggedInVar(false);
    client.clearStore(); // Apollo Client 캐시 초기화
  };

  if (data === "Token has expired") {
    clearToken();
    setIsToken(null);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const logout = () => {
    setIsModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    clearToken();
    setIsToken(null);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const myPage = () => {
    navigate.push("/my-page");
  };

  const login = () => {
    navigate.push("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="w-full h-16 flex items-center bg-header-color pl-5">
      <button className="md:hidden mr-3 text-white" onClick={onMenuToggle}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className="font-bold text-xl md:text-3xl text-white cursor-pointer"
        onClick={() => navigate.push("/")}
      >
        Librarian&apos;s.blog
      </div>
      <div className="flex ml-auto pr-5 text-white cursor-pointer">
        <div onClick={() => navigate.push("/setting")}>설정</div>
        &nbsp;&nbsp;&nbsp;
        {isToken && <div onClick={myPage}>유저 정보</div>}
        &nbsp;&nbsp;&nbsp;
        {isToken ? (
          <div onClick={logout}>로그아웃</div>
        ) : (
          <div onClick={login}>로그인</div>
        )}
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleLogoutConfirm}
        title="로그아웃"
        message="정말 로그아웃 하시겠습니까?"
      />
    </div>
  );
};

export default Header;
