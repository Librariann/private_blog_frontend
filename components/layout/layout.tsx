import Router, { useRouter } from "next/router";
import Header from "../header";
import PostWriteButton from "../post-write-button";
import { isLoggedInVar } from "@/apollo";
import { useReactiveVar } from "@apollo/client";
import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { authPage, handlePathes } from "@/common/constants";
import { useLoadingStore } from "@/stores/useLoadingStore";
import Footer from "../footer";
import { useDarkModeStore } from "@/stores/useDarkmodStore";
import { useMe } from "@/hooks/useMe";
import GlobalLoading2 from "../loading/global-loading2";
import { Analytics } from "@vercel/analytics/next";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const { pathname } = useRouter();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [mounted, setMounted] = useState(false);
  const { globalLoading } = useLoadingStore();
  const { isDarkMode, setIsDarkMode } = useDarkModeStore();

  useMe();
  const requiresLogin =
    authPage.includes(pathname) || pathname.startsWith("/settings/");

  const onToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  useEffect(() => {
    if (mounted && requiresLogin && !isLoggedIn) {
      void Router.replace("/login");
    }
  }, [mounted, requiresLogin, isLoggedIn]);

  if (requiresLogin && (!mounted || !isLoggedIn)) return null;

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
