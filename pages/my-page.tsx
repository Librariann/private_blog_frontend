import UserInfo from "@/components/user-info";
import { useRouter } from "next/router";

const MyPage = () => {
  const router = useRouter();

  const routingMainPage = () => {
    router.push("/");
  };

  return (
    <>
      <UserInfo />
      <button onClick={routingMainPage}>메인으로</button>
    </>
  );
};

export default MyPage;
