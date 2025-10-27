import { useRouter } from "next/router";
import Header from "../header";
import PostWriteButton from "../post-write-button";
import { authTokenVar, isLoggedInVar } from "@/apollo";
import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  authPage,
  handlePathes,
  LOCAL_STORAGE_TOKEN,
} from "@/common/constants";
import { GlobalLoading } from "../loading/global-loading";
import { useLoadingStore } from "@/stores/useLoadingStore";
import Footer from "../footer";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useMe } from "@/hooks/useMe";
import { toast } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const { pathname, push } = useRouter();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { globalLoading } = useLoadingStore();
  const { isDarkMode, setIsDarkMode } = useDarkModeStore();

  const { data, error } = useMe();

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const onToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setMounted(true);
    if (data === undefined && error === "Token has expired") {
      toast.error("로그인 시간이 만료되었습니다. 다시 로그인 해주세요.");
      localStorage.setItem(LOCAL_STORAGE_TOKEN, "");
      authTokenVar(null);
      isLoggedInVar(false);
      push("/");
    }
  }, [data, error, push]);

  //로그인 했을경우에만 접근 가능
  useEffect(() => {
    // 클라이언트 측에서만 실행되도록 설정
    if (authPage.includes(pathname) && !isLoggedIn) {
      toast.error("권한이 없습니다.");
      push("/");
    }
  }, [pathname, isLoggedIn, push]);

  const isLayoutVisible = !handlePathes.includes(pathname); //레이아웃 보여줘야할때

  return (
    <div className="p-0 font-sans flex flex-col min-h-screen">
      {isLayoutVisible && mounted ? (
        <>
          {globalLoading && <GlobalLoading />}
          <div
            className={`min-h-screen relative overflow-hidden ${
              isDarkMode ? "dark" : "light"
            }`}
          >
            {/* Animated gradient background */}
            <div className="fixed inset-0 -z-10">
              {isDarkMode ? (
                <>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604781109199-ced99b89b0f6?...')] bg-cover bg-center" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-slate-900/80 to-black/90" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/30 via-transparent to-purple-950/30" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-slate-100"></div>
                  <div className="absolute inset-0 bg-[url('/images/darkmode-background.jpeg')] bg-cover bg-center opacity-5"></div>
                </>
              )}
            </div>

            <Header
              isDarkMode={isDarkMode}
              onToggleTheme={onToggleTheme}
              isLoggedIn={isLoggedIn}
            />
            <div className="grow">
              <div className="flex flex-row">
                <div className="w-full">{children}</div>
              </div>
              {mounted && isLoggedIn && (
                <div className="fixed bottom-6 right-6">
                  <Link href={`/post-write`}>
                    <PostWriteButton />
                  </Link>
                </div>
              )}
            </div>

            <Footer />
          </div>
        </>
      ) : (
        <div className="w-full">{children}</div>
      )}
    </div>
  );
}

export default Layout;
