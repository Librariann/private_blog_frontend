import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import "../styles/globals.css";
import { makeClient } from "@/apollo";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloNextAppProvider>
  );
}

export default MyApp;
