import { useMe } from "@/hooks/useMe";

const Home = () => {
  const { data, error, loading } = useMe();
  console.log(data);
  return <div className="">Hello World!</div>;
};

export default Home;
