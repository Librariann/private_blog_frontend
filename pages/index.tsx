import { useMe } from "@/hooks/useMe";
import { apolloClient } from "@/apollo";
import { gql } from "@apollo/client";

export default function Home() {
  const { data } = useMe();

  console.log(data);
  return <div className="">Hello World!</div>;
}
