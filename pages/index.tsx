import { useMe } from "@/hooks/useMe";

export default function Home() {
  const { data } = useMe();
  console.log(data);

  const logout = () => {
    console.log("logout");
  };

  return (
    <>
      <div className="">Hello World!</div>
      <button onClick={logout}>로그아웃</button>
    </>
  );
}
