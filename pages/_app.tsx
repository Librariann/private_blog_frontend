import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import "../styles/globals.css";
import { isLoggedInVar, makeClient } from "@/apollo";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";

function MyApp({ Component, pageProps }: AppProps) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <Layout>
        {isLoggedIn ? "login" : "logout"}
        <Component {...pageProps} />
      </Layout>
    </ApolloNextAppProvider>
  );
}

export default MyApp;
