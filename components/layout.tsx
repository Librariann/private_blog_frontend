import { useRouter } from "next/router";
import Header from "./header";
import LeftNavigator from "./left-navigator";
import PostWriteButton from "./post-write-button";
import { isLoggedInVar } from "@/apollo";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};
export const handlePathes = ["/login", "/create-account", "/404"];
const authPage = ["/my-page", "/post-write"];
function Layout({ children }: Props) {
  const { pathname, push } = useRouter();

  //로그인 했을경우에만 접근 가능
  useEffect(() => {
    // 클라이언트 측에서만 실행되도록 설정
    if (authPage.includes(pathname) && !isLoggedInVar()) {
      alert("권한이 없습니다.");
      push("/");
    }
  });

  const isLayoutVisible = !handlePathes.includes(pathname); //레이아웃 보여줘야할때
  return (
    <div className="p-0 font-sans flex flex-col min-h-screen">
      {isLayoutVisible ? (
        <>
          <Header />
          <div className="flex-grow" style={{ height: "calc(100vh - 64px)" }}>
            <div className="flex flex-row h-full">
              <div className="w-1/6">
                <LeftNavigator />
              </div>
              <div className="w-full overflow-y-auto">{children}</div>
            </div>
            <PostWriteButton />
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
