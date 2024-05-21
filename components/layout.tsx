import { useRouter } from "next/router";
import Header from "./header";
import LeftNavigator from "./left-navigator";
import Footer from "./footer";
import Contents from "./contents";

type Props = {
  children: React.ReactNode;
};
export const handlePathes = ["/login", "/create-account"];
function Layout({ children }: Props) {
  const { pathname } = useRouter();
  const isLayoutVisible = !handlePathes.includes(pathname);
  return (
    <>
      <div className="p-0 font-sans flex flex-col min-h-screen">
        {/* <LoginCheck */}
        {isLayoutVisible && <Header />}
        {isLayoutVisible && (
          <div className="flex-grow" style={{ height: "calc(100vh - 128px)" }}>
            <div className="flex flex-row h-full">
              <div className="w-1/6">
                <LeftNavigator />
              </div>
              <div className="w-full">
                <Contents />
              </div>
            </div>
          </div>
        )}
        {children}
        {isLayoutVisible && <Footer />}
      </div>
    </>
  );
}

export default Layout;
