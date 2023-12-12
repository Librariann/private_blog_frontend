import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { ApolloProvider } from "@apollo/client";
import "../styles/globals.css";

const client = "";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
