import { useRouter } from "next/router";
import Header from "../header";
import PostWriteButton from "../post-write-button";
import { isLoggedInVar } from "@/apollo";
import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authPage, handlePathes } from "@/common/constants";
import { GlobalLoading } from "../loading/global-loading";
import { useLoadingStore } from "@/stores/useLoadingStore";
import Footer from "../footer";
import { useDarkModeStore } from "@/stores/useDarkmodStore";

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

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const onToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  //로그인 했을경우에만 접근 가능
  useEffect(() => {
    // 클라이언트 측에서만 실행되도록 설정
    if (authPage.includes(pathname) && !isLoggedIn) {
      alert("권한이 없습니다.");
      push("/");
    }
  }, [pathname, isLoggedIn, push]);

  const isLayoutVisible = !handlePathes.includes(pathname); //레이아웃 보여줘야할때

  return (
    <div className="p-0 font-sans flex flex-col min-h-screen">
      {isLayoutVisible ? (
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
              onMenuToggle={handleMobileMenuClose}
              onToggleTheme={onToggleTheme}
            />
            <div className="grow">
              <div className="flex flex-row">
                <div className="w-full">{children}</div>
              </div>
              {mounted && isLoggedIn && (
                <div className="fixed bottom-6 right-6">
                  <Link href="/post-write">
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
