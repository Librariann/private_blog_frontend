import { useRouter } from "next/router";
import Header from "./header";
import LeftNavigator from "./left-navigator";
import PostWriteButton from "./post-write-button";
import { isLoggedInVar } from "@/apollo";
import { useReactiveVar } from "@apollo/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { authPage, handlePathes } from "@/common/constants";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  const { pathname, push } = useRouter();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
          <Header onMenuToggle={handleMobileMenuClose} />
          <div className="flex-grow" style={{ height: "calc(100vh - 64px)" }}>
            <div className="flex flex-row h-full">
              <div className="md:block md:w-1/6">
                <LeftNavigator
                  isOpen={isMobileMenuOpen}
                  onClose={handleMobileMenuClose}
                />
              </div>
              <div className="w-full overflow-y-auto">{children}</div>
            </div>
            {mounted && isLoggedIn && (
              <div className="fixed bottom-6 right-6">
                <Link href="/post-write">
                  <PostWriteButton />
                </Link>
              </div>
            )}
          </div>

          {/* <Footer /> */}
        </>
      ) : (
        <div className="w-full">{children}</div>
      )}
    </div>
  );
}

export default Layout;
