import Header from "./header";
import LeftNavigator from "./left-navigator";

type Props = {
  children: React.ReactNode;
};
export const handlePathes = ["/login", "/create-account"];
function Layout({ children }: Props) {
  const { pathname } = useRouter();
  const showHeader = !handlePathes.includes(pathname);
  return (
    <>
      <div className="p-0 font-sans">
        {/* <LoginCheck */}
        {showHeader && <Header />}
        {showHeader && <LeftNavigator />}
        {children}
      </div>
    </>
  );
}

export default Layout;
