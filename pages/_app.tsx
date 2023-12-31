import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "../styles/globals.css";
import { client, isLoggedInVar } from "@/apollo";
import { ApolloProvider, useReactiveVar } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloProvider client={client}>
      <Layout>
        {isLoggedIn ? "login" : "logout"}
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
