import type { AppProps } from "next/app";
import Layout from "../components/layout";
import "../styles/globals.css";
import { client, createApolloClient } from "@/apollo";
import { ApolloProvider } from "@apollo/client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "aos/dist/aos.css";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
