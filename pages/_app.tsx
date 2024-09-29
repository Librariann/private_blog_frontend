import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "../styles/globals.css";
import { client, createApolloClient } from "@/apollo";
import { ApolloProvider } from "@apollo/client";
function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
