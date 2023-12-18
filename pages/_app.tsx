import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";
import { apolloClient } from "@/apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
