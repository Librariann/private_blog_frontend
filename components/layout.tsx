import { useRouter } from "next/router";
import Header from "./header";
import LeftNavigator from "./left-navigator";
import Footer from "./footer";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};
export const handlePathes = ["/login", "/create-account", "/404"];
function Layout({ children }: Props) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { pathname } = useRouter();
  const isLayoutVisible = !handlePathes.includes(pathname);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className="p-0 font-sans flex flex-col min-h-screen">
      {isLayoutVisible ? (
        <>
          <Header />
          <div className="flex-grow" style={{ height: "calc(100vh - 64px)" }}>
            <div className="flex flex-row h-full">
              <div className="w-1/6">
                <LeftNavigator selectItem={handleSelect} />
              </div>
              <div className="w-full overflow-y-auto">{children}</div>
            </div>
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
