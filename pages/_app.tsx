import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import "../styles/globals.css";
import { apolloClient, isLoggedInVar } from "@/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        {isLoggedIn ? "login" : "logout"}
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
