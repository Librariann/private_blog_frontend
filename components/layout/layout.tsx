import { useRouter } from "next/router";
import Header from "../header";
import PostWriteButton from "../post-write-button";
import { authTokenVar, isLoggedInVar } from "@/apollo";
import { useReactiveVar } from "@apollo/client";
import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import {
  authPage,
  handlePathes,
  LOCAL_STORAGE_TOKEN,
} from "@/common/constants";
import { useLoadingStore } from "@/stores/useLoadingStore";
import Footer from "../footer";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useMe } from "@/hooks/useMe";
import { toast } from "react-toastify";
import GlobalLoading2 from "../loading/global-loading2";
import { Analytics } from "@vercel/analytics/next";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const { pathname, push } = useRouter();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [mounted, setMounted] = useState(false);
  const { globalLoading } = useLoadingStore();
  const { isDarkMode, setIsDarkMode } = useDarkModeStore();

  const { data, error } = useMe();

  const onToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    startTransition(() => setMounted(true));
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

  const aboutPage = pathname === "/about";
  const isLayoutVisible = !handlePathes.includes(pathname) || aboutPage;

  return (
    <div className="editorial-sans flex min-h-screen flex-col p-0">
      {isLayoutVisible ? (
        <>
          {globalLoading && <GlobalLoading2 />}
          <div
            className={`editorial-shell relative min-h-screen ${
              isDarkMode ? "dark" : "light"
            }`}
          >
            <Header
              isDarkMode={isDarkMode}
              onToggleTheme={onToggleTheme}
              isLoggedIn={mounted && isLoggedIn}
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

            <Footer isDarkMode={isDarkMode} />
          </div>
        </>
      ) : (
        <div className="w-full">
          {children}
          <Analytics />
        </div>
      )}
    </div>
  );
}

export default Layout;
