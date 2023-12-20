import { isLoggedInVar } from "@/apollo";
import { LOCAL_STORAGE_TOKEN } from "@/common/constants";
import { useMe } from "@/hooks/useMe";

export default function Home() {
  const logout = () => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN, "");
    isLoggedInVar(false);
  };

  return (
    <>
      <div className="">Hello World!</div>
      <button onClick={logout}>로그아웃</button>
    </>
  );
}
